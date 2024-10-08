import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "../Loader/Loader";
import { Checkbox } from "@material-ui/core";
import { getPrivileges } from "src/services/role-privileges/services";
import "./AssignRoleBlock.scss";

const AssignRoleBlock = (props) => {
  const [capabilities, setCapabilities] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allSelected, setAllSelected] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(props.permissions);
  }, [props]);

  useEffect(() => {
    props.setValue("privileges", selected);
  }, [selected]);

  const toggleAllSelected = (e) => {
    const { checked } = e.target;
    setAllSelected(checked);
    checked
      ? capabilities && setSelected(capabilities.map((item) => item.id))
      : setSelected([]);
  };
  const toggleSelected = (e, id) => {
    let sel = selected;
    let index = selected.indexOf(id);
    if (!e.target.checked) {
      setAllSelected(false);
      sel.splice(index, 1);
      setSelected([...sel]);
    } else {
      !sel.includes(id) && sel.push(id);
      setSelected([...sel]);
    }
    setAllSelected(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPrivileges();
      if (response.status === "success") {
        setCapabilities(response?.data);
        setLoading(false);
      }
    };
    if (!capabilities) {
      fetchData();
    }
  }, [capabilities]);

  useEffect(() => {
    if (props?.permissions?.length > 0) {
      setPermissions(props?.permissions);
    }
    if (props?.disabled) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [props]);

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const isAllSelected = selectedCount === capabilities?.length;
  const isIndeterminate =
    selectedCount && selectedCount !== capabilities?.length;

  return (
    <>
      {!loading ? (
        <div className="assign-role-block">
          <div className="head-block">
            <div className="title">{props.title}</div>
            <div className="errormsg">{props.errors?.privileges?.message}</div>
            <Link className="add-role" to="/">
              {permissions && `${permissions.length}${props.link_txt}`}
            </Link>
            {!props?.quickView ? (
              <>
                <div className="title title-two">Select All</div>
                <Checkbox
                  checked={allSelected || isAllSelected}
                  onChange={toggleAllSelected}
                  indeterminate={!!isIndeterminate}
                  inputProps={{ "aria-label": "select all courses" }}
                />
              </>
            ) : null}
          </div>
          <div className="checkbox-group">
            {capabilities &&
              capabilities?.map((txt, index) => {
                return (
                  txt.name !== "Email Notification" &&
                  txt.id !== 6 && ( //this condition is applied to skip the rendering of email notificaitons and its id
                    <label
                      className="checkbox-style"
                      key={`${txt.id}_${index}`}
                    >
                      {txt.name}
                      <input
                        disabled={disabled}
                        type="checkbox"
                        checked={
                          allSelected || (selected && selected.includes(txt.id))
                        }
                        value={txt.id}
                        onChange={(e) => toggleSelected(e, txt.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  )
                );
              })}
          </div>
        </div>
      ) : (
        <div>
          <PulseLoader />
        </div>
      )}
    </>
  );
};

export default AssignRoleBlock;
