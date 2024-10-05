import Alert from "@material-ui/lab/Alert";
import { IconButton, Collapse } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";
import "./MessageAlert.scss";

const MessageAlert = (props) => {
  return (
    <div className="message-alert">
      <Collapse in={props.open}>
        <Alert severity={props.severity}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={props.onClick}>
              <CloseIcon fontSize="inherit" />
            </IconButton>}
        >
          {props.message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default MessageAlert;
