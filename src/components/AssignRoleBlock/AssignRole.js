import React, { useEffect, useState } from "react";
import { PulseLoader } from "../Loader/Loader";
import { Checkbox } from "@material-ui/core";
import MessageAlert from "../MessageAlert/MessageAlert";
import "./AssignRole.scss";

const AssignRoleBlock = (props) => {
  const [capabilities, setCapabilities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState('info');

  const priv = JSON.parse(localStorage.getItem("privilegesInfo"));
  let roles = [];

  useEffect(() => {
    setLoading(true);
    let defaultRole = 1;
    if (props?.roles) {
      props?.roles?.map((item) => {
        if(item?.is_global === 1 && item?.company_id === 0){
          defaultRole = item.id
        }
        if (item.is_global === 1 && item.name === priv.default_role) {
          roles.push(item)
        }
        else if (item.is_global === 0) {
          roles.push(item)
        }
      })
      setCapabilities(roles)
      setSelected(props.userRole ? props.userRole : [defaultRole])
      setLoading(false);
    }
  }, [props])

  useEffect(() => {
    props.setValue('privileges', selected)
  }, [selected])

  const toggleAllSelected = (e) => {
    const { checked } = e.target;
    setAllSelected(checked);
    let defaultRole = 1;
    capabilities.map(item =>{
      if(item?.is_global === 1 && item?.company_id === 0){
        defaultRole = item.id
      }
    })
    checked ? capabilities && setSelected(capabilities.map(item => item.id)) : setSelected([defaultRole])
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toggleSelected = (e, txt) => {
    if (txt.name === priv.default_role) {
      setMessage("Default role hence can't be unchecked");
      setSeverity("warning");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }
    let sel = selected;
    let index = sel.indexOf(txt.id);
    if (!e.target.checked) {
      setAllSelected(false);
      sel.splice(index, 1)
      setSelected([...sel]);
    } else {
      !sel.includes(txt.id) && sel.push(txt.id)
      setSelected([...sel]);
    }
    setAllSelected(false)
  };
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const isAllSelected = selectedCount === capabilities?.length;

  if (loading) {
    return (
      <div className="loader-div">
        <PulseLoader />
      </div>
    );
  }
  return (
    <>
      <div className="assign-role-block">
        <div className="head-block">
          <div className="title">Assign Role's</div>
          {!props?.quickView ?
            <div className="title-left">
              <div className="selectAll">Select All</div>
              <Checkbox
                checked={allSelected || isAllSelected}
                onChange={toggleAllSelected}
                inputProps={{ "aria-label": "select all courses" }}
              />
            </div>
            : null}
        </div>
        <div className="checkbox-group">
          {capabilities ? capabilities.map((txt, index) => {
            return (
              props?.quickView ?
                <label className="checkbox-style" key={`${txt.id}_${index}`}>
                  {txt.name}
                  <input type="checkbox" value={txt.id} checked={props?.userRole?.includes(txt.id * 1)}
                    disabled={props?.quickView || (props?.userRole && props?.userRole?.includes(txt.id * 1))}
                  />
                  <span className="checkmark"></span>
                </label>
                : <label className="checkbox-style" key={`${txt.id}_${index}`}>
                  {txt.name}
                  <input type="checkbox" disabled={props?.quickView} value={txt.id}
                    checked={allSelected || selected.includes(txt.id)}
                    onChange={(e) => toggleSelected(e, txt)}
                  />
                  <span className="checkmark"></span>
                </label>
            );
          }) : null}
        </div>
      </div>
      <MessageAlert
        severity={severity}
        open={open}
        message={message}
        onClick={handleClose}
      />
    </>
  );
};

export default AssignRoleBlock;
