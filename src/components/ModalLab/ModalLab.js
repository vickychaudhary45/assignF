import { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { PulseLoader } from "../Loader/Loader";
import { getLabCredentials, getSanboxCredentials } from "src/services/Lab-services/services";
import { DialogTitle } from "../MUIComponents/MUIComponents";
import "./ModalLab.scss";

const ModalLab = props => {
  const { apiData } = props;
  const [labDetails, setLabDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const data1 = {
    user_quest_id: apiData?.user_quest_id,
    lab_type: apiData?.lab_type,
  };

  const clipBoard = text => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (apiData?.user_quest_id && apiData?.lab_type && apiData?.type === "lab") {
        const res = await getLabCredentials(data1);
        if (res?.data?.status === true) {
          setLabDetails(...res.data.data);
          setLoading(false);
        }
      }

      if (apiData?.user_quest_id && apiData?.lab_type && apiData?.type === "sandbox") {
        const res = await getSanboxCredentials(data1);
        if (res?.data?.status === true) {
          setLabDetails(...res.data.data);
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [apiData]);

  return (
    <Dialog className="modal-lab" onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
      <div className="modal">
        <div className="modal-title">
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
            Cloud Credentials
          </DialogTitle>
        </div>
        {!loading ? (
          <div className="modal-text">
            <label>Login Link</label>
            <div className="input-box-group">
              <input type="text" defaultValue={labDetails?.login_link} placeholder="Login Link" disabled />
              <ContentCopyIcon onClick={() => clipBoard(labDetails?.login_link)} />
            </div>

            <label>Username</label>
            <div className="input-box-group">
              <input type="text" defaultValue={labDetails?.username} placeholder="Username" disabled />
              <ContentCopyIcon onClick={() => clipBoard(labDetails?.username)} />
            </div>

            <label>Password</label>
            <div className="input-box-group">
              <input type="text" defaultValue={labDetails?.password} placeholder="Password" disabled />
              <ContentCopyIcon onClick={() => clipBoard(labDetails?.password)} />
            </div>

            {apiData?.lab_type === 1 && (
              <>
                <label>Access Key</label>
                <div className="input-box-group">
                  <input type="text" defaultValue={labDetails?.accesskey} placeholder="Access Key" disabled />
                  <ContentCopyIcon onClick={() => clipBoard(labDetails?.accesskey)} />
                </div>

                <label>Secret Key</label>
                <div className="input-box-group">
                  <input type="text" defaultValue={labDetails?.secretkey} placeholder="Secret Key" disabled />
                  <ContentCopyIcon onClick={() => clipBoard(labDetails?.secretkey)} />
                </div>
              </>
            )}

            {apiData?.lab_type === 2 && (
              <>
                <label>Resource Group</label>
                <div className="input-box-group">
                  <input type="text" defaultValue={labDetails?.resource_group} placeholder="Resource Group" disabled />
                  <ContentCopyIcon onClick={() => clipBoard(labDetails?.resource_group)} />
                </div>
              </>
            )}

            {apiData?.lab_type === 3 && (
              <>
                <label>Project ID</label>
                <div className="input-box-group">
                  <input type="text" defaultValue={labDetails?.project_id} placeholder="Project ID" disabled />
                  <ContentCopyIcon onClick={() => clipBoard(labDetails?.project_id)} />
                </div>
                <label>Project Name</label>
                <div className="input-box-group">
                  <input type="text" defaultValue={labDetails?.project_name} placeholder="Project Name" disabled />
                  <ContentCopyIcon onClick={() => clipBoard(labDetails?.project_name)} />
                </div>
              </>
            )}

            {apiData?.lab_type === 6 && (
              <>
                <label>Server IP</label>
                <div className="input-box-group">
                  <input type="text" defaultValue={labDetails?.server_ip} placeholder="Server IP" disabled />
                  <ContentCopyIcon onClick={() => clipBoard(labDetails?.server_ip)} />
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="react-loader">
              <PulseLoader />
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default ModalLab;
