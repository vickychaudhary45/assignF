import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress } from "@material-ui/core";
import AvatarEditor from "react-avatar-editor";
import './UploadImage.scss'

const UploadImage = ({ uploadProcess, onImageChange, openStatus, setUploadModal, cl }) => {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [fileName, setFileName] = useState(null);

  const closeModal = (e: any) => {
    e.preventDefault();
    setUploadModal(false);
    setImage("");
    setCrop({});
  };

  const onUploadImage = async (event: any) => {
    event.preventDefault();
    setImage(URL.createObjectURL(event.target.files[0]));
    setFileName(event.target.files[0].name);
  };

  const cropImage = async (e:any) => {
    if (crop) {
      onImageChange(crop.getImage().toDataURL(),fileName);
    }
  };

  const setEditorRef = (editor: any) => {
    setCrop(editor);
  };

  return (
    <>
      <Dialog className="upload-images-modal" aria-labelledby="customized-dialog-title" open={openStatus} maxWidth='sm' fullWidth>
        <DialogTitle id="customized-dialog-title">Upload Image</DialogTitle>
        <DialogContent >
          {image ? (
            <div>
              <AvatarEditor ref={setEditorRef} image={image}
                width={cl === "called" ? 450 : 250}
                height={250}
                border={60}
                borderRadius={cl === "called" ? 0 : 120}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
              />
              <div>
                <label htmlFor="scale-input">Scale: </label>
                <input id="scale-input" type="number" step="0.1" value={scale} disabled={!image}
                  onChange={(e) => setScale(Number(e.target.value))}/>
            </div>
            </div>
          ) : (
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden onChange={(e) => onUploadImage(e)} />
            </Button>
          )}
          <ul>
            <li ><span>*</span> Upload images in the mentioned formats (jpeg, png, psg, pdf, etc.) </li>
            <li ><span>*</span> Image size within the range of 20KB to 50KB</li>
          </ul>
          {uploadProcess ? <LinearProgress /> : ""}
        </DialogContent>
        {!uploadProcess ? (
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={(e) => closeModal(e)}>Cancel</Button>
            {image ? (
              <Button variant="contained" color="primary" onClick={(e) => cropImage(e)}>Save</Button>
            ) : ("")}
          </DialogActions>
        ) : ( "")}
      </Dialog>
    </>
  );
};

export default UploadImage;
