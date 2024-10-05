import { Link } from "react-router-dom";
import "./BtnMain.scss";

const BtnMain = (props) => {
  return (
    <Link className={`btn btnMain ${props.class}`} to={props.path}>
      {props.text}
    </Link>
  );
};

export default BtnMain;
