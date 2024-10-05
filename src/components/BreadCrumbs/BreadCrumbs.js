import { Link } from "react-router-dom";
import "./BreadCrumbs.scss";

const BreadCrumbs = (props) => {
  return (
    <div className="breadcrumbs">
      <div className="links">
        <Link to={props.back_path}>{props.back_txt}</Link>/
        <span> {props.create_txt}</span>
      </div>
      <div className="sub-title">{props.sub_title}</div>
    </div>
  );
}

export default BreadCrumbs;
