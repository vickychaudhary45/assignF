// import { useEffect, useState, useContext } from "react";
// import "./AssignRoleBlock.scss";

// import { Link } from "react-router-dom";
// import { Checkbox } from "@material-ui/core";
// import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// // Custom imports
// import { PulseLoader } from "../Loader/Loader";
// import { PermissionContexts } from "../../PermissionContexts";
// import { getPrivileges } from "src/services/role-privileges/services";

// const AssignRoleBlock = (props) => {
//   const { privileges } = useContext(PermissionContexts);

//   // previleges states management
//   const [selected, setSelected] = useState([]);
//   const [menuLength, setMenuLength] = useState(0);
//   const [permissions, setPermissions] = useState(null);
//   const [capabilities, setCapabilities] = useState(null);
//   const [allSelected, setAllSelected] = useState(false);

//   // misc states
//   const [loading, setLoading] = useState(true);
//   const [disabled, setDisabled] = useState(false);
//   const [dataToRemove, setDataToRemove] = useState([]);

//   const selectedCount = Object.values(selected).filter(Boolean).length;
//   const isAllSelected = selectedCount === capabilities?.length;
//   const isIndeterminate =
//     selectedCount && selectedCount !== capabilities?.length;

//   // Toggle all selected
//   const toggleAllSelected = (e) => {
//     const { checked } = e.target;
//     setAllSelected(checked);
//     checked
//       ? capabilities && setSelected(capabilities.map((item) => item.id))
//       : setSelected([]);
//   };

//   // Toggle selected sub menu
//   const toggleSelected = (e, id) => {
//     let sel = [...selected];
//     let index = sel.indexOf(id);
//     let parent = capabilities.find((item) => {
//       return item.sub_menu.find((sub_item) => sub_item.id === id);
//     });
//     if (!e.target.checked) {
//       setAllSelected(false);
//       sel.splice(index, 1);
//       if (
//         parent &&
//         parent.sub_menu.every((sub_item) => !sel.includes(sub_item.id))
//       ) {
//         let parentIndex = sel.indexOf(parent.id);
//         if (parentIndex !== -1) {
//           sel.splice(parentIndex, 1);
//         }
//       }
//       setSelected([...sel]);
//     } else {
//       if (!sel.includes(id)) {
//         sel.push(id);
//       }
//       if (parent && !sel.includes(parent.id)) {
//         sel.push(parent.id);
//       }
//       setSelected([...sel]);
//     }
//     setAllSelected(false);
//   };

//   // Toggle all selected parent menu
//   const toggleSelectedParent = (e, id) => {
//     if (!e.target.checked) {
//       setAllSelected(false);
//       let sel = selected;
//       let index = selected.indexOf(id);
//       if (index !== -1) {
//         sel.splice(index, 1);
//       }
//       capabilities &&
//         capabilities.map((item) => {
//           if (item.id === id) {
//             item.sub_menu.map((sub_item) => {
//               let index = sel.indexOf(sub_item.id);
//               if (index !== -1) {
//                 sel.splice(index, 1);
//               }
//             });
//           }
//         });
//       setSelected([...sel]);
//     } else {
//       let sel = selected;
//       let index = selected.indexOf(id);
//       if (index === -1) {
//         sel.push(id);
//         capabilities &&
//           capabilities.map((item) => {
//             if (item.id === id) {
//               item.sub_menu.map((sub_item) => {
//                 if (!sel.includes(sub_item.id)) {
//                   sel.push(sub_item.id);
//                 }
//               });
//             }
//           });
//         setSelected([...sel]);
//       }
//     }
//     if (selected.length === menuLength) {
//       setAllSelected(true);
//     } else {
//       setAllSelected(false);
//     }
//   };

//   useEffect(() => {
//     setSelected(props.permissions);
//   }, [props]);

//   useEffect(() => {
//     props.setValue("privileges", selected);
//   }, [selected]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getPrivileges();
//       console.log(response, "response");
//       if (response.status === "success") {
//         setCapabilities(response?.data);
//         setMenuLength(response?.data.length);
//         setDataToRemove(response?.parentMenu);
//         setLoading(false);
//       }
//     };
//     if (!capabilities) {
//       fetchData();
//     }
//   }, [capabilities]);
//   console.log(props, "props");

//   useEffect(() => {
//     if (props?.permissions?.length > 0) {
//       // const filteredPermissions = props.permissions.filter(
//       //   (item) => !dataToRemove.includes(item)
//       // );
//       setPermissions(props?.permissions);
//     }
//     if (props?.disabled) {
//       setDisabled(true);
//     } else {
//       setDisabled(false);
//     }
//   }, [props, dataToRemove]);

//   return (
//     <>
//       {!loading ? (
//         <div className="assign-role-block">
//           <div className="head-block">
//             <div className="title">{props.title}</div>
//             <div className="errormsg">{props.errors?.privileges?.message}</div>
//             {/* <span className="add-role">
//               {permissions && `${permissions.length}${props.link_txt}`}
//             </span> */}
//             {!props?.quickView ? (
//               <>
//                 <div className="title title-two">Select All</div>
//                 <Checkbox
//                   checked={allSelected || isAllSelected}
//                   onChange={toggleAllSelected}
//                   indeterminate={!!isIndeterminate}
//                   inputProps={{ "aria-label": "select all courses" }}
//                 />
//               </>
//             ) : null}
//           </div>
//           <div className="checkbox-group">
//             {!props?.quickView ? (
//               <>
//                 {capabilities &&
//                   capabilities?.map((child, index) => {
//                     return child?.sub_menu?.length > 0 ? (
//                       <>
//                         {!privileges?.enable_custom_sandbox &&
//                         !privileges?.enable_workspaces &&
//                         !privileges?.enable_vm &&
//                         child.name === "Custom Environment" ? null : (
//                           <Accordion
//                             className="accordion"
//                             key={`${child.id}_${index}`}
//                           >
//                             <AccordionSummary
//                               className="summary"
//                               expandIcon={<ExpandMoreIcon />}
//                               aria-hidden="true"
//                             >
//                               <div className="accordion-title">
//                                 {child.name}
//                               </div>
//                               <div className="accordion-sub">
//                                 <label
//                                   className="checkbox-style"
//                                   key={`${child.name}_${index}`}
//                                 >
//                                   <input
//                                     disabled={disabled}
//                                     type="checkbox"
//                                     checked={
//                                       allSelected ||
//                                       (selected && selected.includes(child.id))
//                                     }
//                                     value={child.id}
//                                     onChange={(e) =>
//                                       toggleSelectedParent(e, child.id)
//                                     }
//                                   />
//                                   <span className="checkmark"></span>
//                                 </label>
//                               </div>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                               {child.sub_menu?.map((child, index) => {
//                                 if (
//                                   child.name === "Labs Validation Report" &&
//                                   !privileges.enable_lab_validation
//                                 ) {
//                                   return null;
//                                 }
//                                 if (
//                                   (child.name === "Custom Environment" ||
//                                     child.name === "Custom Sandboxes") &&
//                                   !privileges.enable_custom_sandbox
//                                 ) {
//                                   return null;
//                                 }
//                                 if (
//                                   (child.name === "Custom Environment" ||
//                                     child.name === "Workspaces") &&
//                                   !privileges.enable_workspaces
//                                 ) {
//                                   return null;
//                                 }
//                                 if (
//                                   (child.name === "Custom Environment" ||
//                                     child.name === "Virtual Machines") &&
//                                   !privileges.enable_vm
//                                 ) {
//                                   return null;
//                                 }
//                                 return (
//                                   <label
//                                     className="checkbox-style"
//                                     key={`${child.name}_${index}`}
//                                   >
//                                     {child.name}
//                                     <input
//                                       disabled={disabled}
//                                       type="checkbox"
//                                       checked={
//                                         allSelected ||
//                                         (selected &&
//                                           selected.includes(child.id))
//                                       }
//                                       value={child.id}
//                                       onChange={(e) =>
//                                         toggleSelected(e, child.id)
//                                       }
//                                     />
//                                     <span className="checkmark"></span>
//                                   </label>
//                                 );
//                               })}
//                             </AccordionDetails>
//                           </Accordion>
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         {child.sub_menu?.length === 0 && (
//                           <>
//                             <div>
//                               <label
//                                 className="checkbox-style"
//                                 key={`${child.id}_${index}`}
//                               >
//                                 {child.name}
//                                 <input
//                                   disabled={disabled}
//                                   type="checkbox"
//                                   checked={
//                                     allSelected ||
//                                     (selected && selected.includes(child.id))
//                                   }
//                                   value={child.id}
//                                   onChange={(e) =>
//                                     toggleSelectedParent(e, child.id)
//                                   }
//                                 />
//                                 <span className="checkmark"></span>
//                               </label>
//                             </div>
//                           </>
//                         )}
//                       </>
//                     );
//                   })}
//               </>
//             ) : (
//               <>
//                 {capabilities &&
//                   capabilities
//                     .filter((child) => selected.includes(child.id))
//                     .map((child, index) => {
//                       // Check if the parent menu has submenus or if it should be displayed
//                       if (child.sub_menu?.length > 0) {
//                         return !privileges?.enable_custom_sandbox &&
//                           !privileges?.enable_workspaces &&
//                           !privileges?.enable_vm &&
//                           child.name === "Custom Environment" ? null : (
//                           <Accordion
//                             className="accordion"
//                             key={`${child.id}_${index}`}
//                           >
//                             <AccordionSummary
//                               className="summary"
//                               expandIcon={<ExpandMoreIcon />}
//                               aria-hidden="true"
//                             >
//                               <div className="accordion-title">
//                                 {child.name}
//                               </div>
//                               <div className="accordion-sub">
//                                 <label
//                                   className="checkbox-style"
//                                   key={`${child.name}_${index}`}
//                                 >
//                                   <input
//                                     disabled={disabled}
//                                     type="checkbox"
//                                     checked={
//                                       allSelected ||
//                                       (selected && selected.includes(child.id))
//                                     }
//                                     value={child.id}
//                                     onChange={(e) =>
//                                       toggleSelectedParent(e, child.id)
//                                     }
//                                   />
//                                   <span className="checkmark"></span>
//                                 </label>
//                               </div>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                               {child.sub_menu
//                                 ?.filter((subChild) =>
//                                   selected.includes(subChild.id)
//                                 )
//                                 .map((subChild, subIndex) => {
//                                   if (
//                                     (subChild.name ===
//                                       "Labs Validation Report" ||
//                                       child.name ===
//                                         "Labs Validation Report") &&
//                                     !privileges.enable_lab_validation
//                                   ) {
//                                     return null;
//                                   }
//                                   if (
//                                     subChild.name === "Custom Sandboxes" &&
//                                     !privileges.enable_custom_sandbox
//                                   ) {
//                                     return null;
//                                   }
//                                   if (
//                                     subChild.name === "Workspaces" &&
//                                     !privileges.enable_workspaces
//                                   ) {
//                                     return null;
//                                   }
//                                   if (
//                                     subChild.name === "Virtual Machines" &&
//                                     !privileges.enable_vm
//                                   ) {
//                                     return null;
//                                   }
//                                   return (
//                                     <label
//                                       className="checkbox-style"
//                                       key={`${subChild.name}_${subIndex}`}
//                                     >
//                                       {subChild.name}
//                                       <input
//                                         disabled={disabled}
//                                         type="checkbox"
//                                         checked={
//                                           allSelected ||
//                                           (selected &&
//                                             selected.includes(subChild.id))
//                                         }
//                                         value={subChild.id}
//                                         onChange={(e) =>
//                                           toggleSelected(e, subChild.id)
//                                         }
//                                       />
//                                       <span className="checkmark"></span>
//                                     </label>
//                                   );
//                                 })}
//                             </AccordionDetails>
//                           </Accordion>
//                         );
//                       } else if (
//                         child.sub_menu?.length === 0 &&
//                         selected.includes(child.id)
//                       ) {
//                         return (
//                           <div key={`${child.id}_${index}`}>
//                             <label
//                               className="checkbox-style"
//                               key={`${child.id}_${index}`}
//                             >
//                               {child.name}
//                               <input
//                                 disabled={disabled}
//                                 type="checkbox"
//                                 checked={
//                                   allSelected ||
//                                   (selected && selected.includes(child.id))
//                                 }
//                                 value={child.id}
//                                 onChange={(e) =>
//                                   toggleSelectedParent(e, child.id)
//                                 }
//                               />
//                               <span className="checkmark"></span>
//                             </label>
//                           </div>
//                         );
//                       }
//                       return null;
//                     })}
//               </>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <PulseLoader />
//         </div>
//       )}
//     </>
//   );
// };

// export default AssignRoleBlock;

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
