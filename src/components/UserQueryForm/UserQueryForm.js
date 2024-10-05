import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import MessageAlert from '../../components/MessageAlert/MessageAlert';
import JoditEditor from 'jodit-react';
import { createTicket, uploadImgToS3 } from '../../services/query-services/services';
import { TabPanel } from '../MUIComponents/MUIComponents';
import './UserQueryForm.scss';
import imageCompression from 'browser-image-compression';

// Jodit-Editor
const copyStringToClipboard = (str) => {
  let el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const facilityMergeFields = ['FacilityNumber', 'FacilityName', 'Address', 'MapCategory', 'Latitude', 'Longitude', 'ReceivingPlant', 'TrunkLine', 'SiteElevation'];
const inspectionMergeFields = ['InspectionCompleteDate', 'InspectionEventType'];

const createOptionGroupElement = (mergeFields, optionGroupLabel) => {
  const optionGroupElement = document.createElement('optgroup');
  optionGroupElement.label = optionGroupLabel;
  mergeFields.forEach(mergeField => {
    const optionElement = document.createElement('option');
    optionElement.classList.add('merge-field-select-option');
    optionElement.value = mergeField;
    optionElement.text = mergeField;
    optionGroupElement.appendChild(optionElement);
  });
  return optionGroupElement;
};

const buttons = [
  'paragraph', '|', 'bold', '|', 'italic', '|', 'brush', '|', 'align', 'outdent', 'indent', '|', 'ul', 'ol', '|', 'font', 'fontsize', '|', 'table', '|',
  'copyformat', '|', 'selectall', '|', 'link', 'video', '|',
  {
    name: 'insertMergeField',
    tooltip: 'Insert Merge Field',
    iconURL: 'images/merge.png',
    popup: (editor) => {
      const onSelected = (e) => {
        let mergeField = e.target.value;
        if (mergeField) {
          editor.selection.insertNode(editor.create.inside.fromHTML('{{' + mergeField + '}}'));
        }
      }
      let divElement = editor.create.div('merge-field-popup');
      let labelElement = document.createElement('label');
      labelElement.setAttribute('class', 'merge-field-label');
      labelElement.text = 'Merge field: ';
      divElement.appendChild(labelElement);

      let selectElement = document.createElement('select');
      selectElement.setAttribute('class', 'merge-field-select');
      selectElement.appendChild(createOptionGroupElement(facilityMergeFields, 'Facility'));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, 'Inspection'));
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      return divElement;
    },
  },
  {
    name: 'copyContent',
    tooltip: 'Copy HTML to Clipboard',
    iconURL: 'images/copy.png',
    exec: function (editor) {
      let html = editor.value;
      copyStringToClipboard(html);
    },
  },
];

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'small',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: 'insert_clear_html',
  buttons: buttons,
  uploader: {
    insertImageAsBase64URI: true,
    formats: ['jpg', 'jpeg', 'png', 'svg'],
  },
  width: 'auto',
  height: 250,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserQueryForm = () => {
  const [data, setData] = useState('');
  const classes = useStyles();
  const InputRef = useRef();
  const history = useHistory();
  const [buttonUpdate, setButtonUpdate] = useState(false);
  const [img, setImg] = useState('');
  const [open, setOpen] = useState(false);
  const [alertResponse, setAlertResponse] = useState({ status: '', msg: '', });
  const [queryData, setQueryData] = useState({ title: '', description: '', priority: '', type: '', });
  const [file, setFile] = useState(null);
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const company_id = user_data?.data.company_id;


  const toDataURL = async url => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const sanitizeFileName = (fileName) => {
    return fileName
      .replace(/\s+/g, '_')
      .replace(/[^\w._-]/g, '');
  };

  const generateSafeUniqueFileName = (fileName) => {
    const sanitizedFileName = sanitizeFileName(fileName);
    const timestamp = Date.now();
    const uniqueName = `${timestamp}_${sanitizedFileName}`;
    return uniqueName;
  };
  // handle upload image and compression
  const UploadImg = async (event) => {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const urlFormat = URL.createObjectURL(compressedFile);
      const dataUrl = await toDataURL(urlFormat);
      setFile(compressedFile);
      setImg(dataUrl);
    } catch (error) {
      InputRef.current.value = null;
      setOpen(true);
      setAlertResponse({ status: "warning", msg: "Failed to compress image" });
      setTimeout(() => setOpen(false), 5000);
    }
  };

  // submit ticket
  const onSubmit = async (e) => {
    e.preventDefault();
    setButtonUpdate(true);
    if (!queryData.title || !queryData.type || !queryData.description) {
      setOpen(true);
      setAlertResponse({
        status: "warning",
        msg: "Please enter required fields",
      });
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      setButtonUpdate(false);
      return;
    }
    try {
      const uniqueFileName = img ? generateSafeUniqueFileName(file?.name) : "";
      if (img) {
        const uniqueFileName = generateSafeUniqueFileName(file?.name);
        const formData = new FormData();
        formData.append("file", img);
        formData.append("directory_name", "support-query-uploads");
        formData.append("file_name", uniqueFileName);
        await uploadImgToS3(formData);
      }
      const formData = {
        title: queryData.title,
        description: queryData.description,
        priority: queryData.priority ? queryData.priority : "",
        type: queryData.type,
        attachment_path: img && file?.name ? uniqueFileName : "",
        company_id: company_id,
      };
      const res = await createTicket(formData);
      setOpen(true);
      setButtonUpdate(false);
      setAlertResponse({
        status: res?.status === true ? "success" : "warning",
        msg: res.msg ? res.msg : "Some error occurred.",
      });
      if (res?.status === true) {
        setTimeout(() => {
          history.push("/support-page");
        }, 1000);
      }
      setTimeout(() => {
        setOpen(false);
      }, 2000);
  
    } catch (error) {
      console.error("Error submitting form:", error);
      setOpen(true);
      setAlertResponse({
        status: "warning",
        msg: "An error occurred while submitting the form.",
      });
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      setButtonUpdate(false);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          selectionFollowsFocus={true}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Raise your concern here" />
        </Tabs>
      </AppBar>
      {/* ----- tab-1 ------ */}
      <TabPanel value={0} index={0} className="tab-content">
        <form className="form-default" onSubmit={onSubmit}>
          <div className="input-group">
            <div className="input-box">
              <label> Title <span>*</span></label>
              <input type="text" placeholder="E.g. Support" required defaultValue={queryData.title}
                onChange={(e) => setQueryData({ ...queryData, title: e.target.value })}
              />
            </div>
          </div>
          {/* {dropdown} */}
          <div className="select-block">
            <div className="input-box">
              <label> Type <span>*</span> </label>
              <div className="input-style">
                <i className="icon icon-dropdown"></i>
                <select name="type" onChange={(e) => setQueryData({ ...queryData, type: e.target.value })}>
                  <option value="">Select Type</option>
                  <option value="Support">Support Request</option>
                  <option value="Labs">Labs/Sandbox Issue</option>
                  <option value="Products">Products Issue</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="Business">New Feature</option>
                </select>
              </div>
            </div>
            <div className="input-box">
              <label>Priority</label>
              <div className="input-style">
                <i className="icon icon-dropdown"></i>
                <select name="priority" onChange={(e) => setQueryData({ ...queryData, priority: e.target.value })}>
                  <option value="">Select Priority</option>
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">Urgent</option>
                </select>
              </div>
            </div>
          </div>
          {/* Text-Editor */}
          <div className="textarea-block">
            <div className="input-box">
              <label> Description <span>*</span></label>
            </div>
          </div>
          <div className="jodit-text-editor">
            <JoditEditor
              value={data}
              config={editorConfig}
              onChange={(value) => { setData(value); setQueryData({ ...queryData, description: value }); }}
            />
          </div>
          {/* reference image */}
          <div className="upload-block">
            <div className="input-box">
              <label> Upload for Reference</label>
              <input
                accept="image/jpeg,image/png,image/jpeg,"
                type="file"
                ref={InputRef}
                onChange={(e) => {
                  UploadImg(e);
                }}
              />
            </div>
            <p> Upload images in the mentioned formats (png,jpeg,jpg)</p>
          </div>
          {buttonUpdate === true ? (
            <CircularProgress color="info" size={25} />
          ) : (
            <div className="btn-box">
              <input className="btn btn-save" type="submit" value="save"></input>
            </div>
          )}
        </form>
      </TabPanel>
      <MessageAlert gutterTop severity={alertResponse?.status} message={alertResponse?.msg}
        onClick={() => { setOpen(false); }} open={open} />
    </div>
  );
}

export default UserQueryForm;
