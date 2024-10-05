import React, { useEffect, useState, useContext } from "react";
import "./Sidebar.scss";

// mui imports
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import { NavLink, useLocation } from "react-router-dom";

// custom imports
import Shape from "../Shape/Shape";
import { parseJwt } from "src/config/utils";
import { SidebarProps } from "../Props/SidebarProps";
import { PermissionContexts } from "../../PermissionContexts";

const MenuItem = ({ item, privileges, key }) => {
  const Component = item?.sub_nav_link ? MultiLevel : SingleLevel;
  return <Component privileges={privileges} item={item} />;
};

const SingleLevel = ({ item, privileges }) => {
  return (
    <li>
      {item.nav_link === "Dashboard" ? (
        <Tooltip title={item.nav_link} placement="right">
          <NavLink
            exact
            to={privileges.is_employee ? item.path_employee : item.path}
            activeClassName="active"
          >
            <i className={`${item.icon}`}></i>
            <span>{item.nav_link}</span>
          </NavLink>
        </Tooltip>
      ) : item.nav_link === "Requested Courses" ? (
        <Tooltip title={item.nav_link} placement="right">
          <NavLink exact to={item.path} activeClassName="active">
            <i className={`${item.icon}`}></i>
            <span>{item.nav_link}</span>
            {item.nav_link === "Requested Courses" &&
            privileges.totalUserRequestCourses > 0 ? (
              <span className="notification-badge">
                {privileges.totalUserRequestCourses}
              </span>
            ) : null}
          </NavLink>
        </Tooltip>
      ) : item.nav_link === "Workspaces" ? (
        privileges.enable_workspaces && (
          <Tooltip title={item.nav_link} placement="right">
            <NavLink exact to={item.path} activeClassName="active">
              <i className={`${item.icon}`}></i>
              <span>{item.nav_link}</span>
            </NavLink>
          </Tooltip>
        )
      ) : item.nav_link === "Custom Sandboxes" ? (
        privileges.enable_custom_sandbox && (
          <Tooltip title={item.nav_link} placement="right">
            <NavLink exact to={item.path} activeClassName="active">
              <i className={`${item.icon}`}></i>
              <span>{item.nav_link}</span>
            </NavLink>
          </Tooltip>
        )
      ) : item.nav_link === "Virtual Machines" ? (
        privileges.enable_vm && (
          <Tooltip title={item.nav_link} placement="right">
            <NavLink exact to={item.path} activeClassName="active">
              <i className={`${item.icon}`}></i>
              <span>{item.nav_link}</span>
            </NavLink>
          </Tooltip>
        )
      ) : item.nav_link === "Labs Validation Report" ? (
        privileges.enable_lab_validation && (
          <Tooltip title={item.nav_link} placement="right">
            <NavLink exact to={item.path} activeClassName="active">
              <i className={`${item.icon}`}></i>
              <span>{item.nav_link}</span>
            </NavLink>
          </Tooltip>
        )
      ) : (
        <Tooltip title={item.nav_link} placement="right">
          <NavLink exact to={item.path} activeClassName="active">
            <i className={`${item.icon}`}></i>
            <span>{item.nav_link}</span>
          </NavLink>
        </Tooltip>
      )}
    </li>
  );
};

const MultiLevel = ({ item, privileges }) => {
  const { sub_nav_link: children } = item;
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    //enable toggling of submenu even if item.path is active
    for (let link_element of children) {
      if (link_element.path === location.pathname) {
        setOpen(true);
        break;
      }
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <li>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            {item?.nav_link === "Lab Analytics" ? (
              <ScienceOutlinedIcon style={{ color: "#1f2430" }} />
            ) : (
              <i className={`${item.icon}`}></i>
            )}
          </ListItemIcon>
          <ListItemText primary={item.nav_link} />
          {item.nav_link === "Manage" &&
          privileges?.totalUserRequestCourses > 0 ? (
            <span className="notification-dot"></span>
          ) : null}
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, key) => {
              if (privileges?.is_owner) {
                return (
                  <>
                    <MenuItem privileges={privileges} key={key} item={child} />
                  </>
                );
              } else if (privileges?.privileges.includes(child.nav_link)) {
                return (
                  <>
                    <MenuItem privileges={privileges} key={key} item={child} />
                  </>
                );
              }
              // else if (
              //   child.nav_link === "Create Learning Path" ||
              //   child.nav_link === "Roles/Privileges"
              // ) {
              //   console.log("here3");
              //   return (
              //     <>
              //       <MenuItem privileges={privileges} key={key} item={child} />
              //     </>
              //   );
              // }
            })}
            {/* {children.map((child, key) => {
              if (privileges?.is_owner) {
                return (
                  <>
                    <MenuItem privileges={privileges} key={key} item={child} />
                  </>
                );
              } else if (
                !child.nav_link.includes("Live") &&
                !child.nav_link.includes("Behaviour") &&
                ((privileges?.is_employee &&
                  child.nav_link != "Enrollment Report") ||
                  (child.nav_link == "Enrollment Report" &&
                    privileges?.privileges.includes("Analytics")) ||
                  privileges?.is_owner)
              )
                return (
                  <>
                    <MenuItem privileges={privileges} key={key} item={child} />
                  </>
                );
            })} */}
          </List>
        </Collapse>
      </li>
    </React.Fragment>
  );
};
const Sidebar = () => {
  const { privileges } = useContext(PermissionContexts);

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const userInfo = parseJwt(user_data?.data.token);
  let user_id = userInfo.userId;

  let priv_access = [
    {
      nav_link: "Manage",
      path: "/manage",
      icon: "icon icon-setting-nav",
      sub_nav_link: [],
    },
  ];
  SidebarProps.links_first.map((item) => {
    item?.sub_nav_link &&
      item.sub_nav_link.map((itm, key) => {
        if (!privileges?.is_owner || privileges?.is_employee) {
          if (privileges?.privileges.includes(itm?.nav_link)) {
            priv_access[0].sub_nav_link.push(itm);
          }
        }
      });
    if (
      privileges?.privileges.includes(
        "Subscriptions" || "Courses" || "Learning Path"
      ) &&
      item?.nav_link === "Enrollments"
    ) {
      priv_access.push(item);
    }
  });
  const labMonitorItems = [
    "Live Labs Dashboard",
    "Live Sandbox Dashboard",
    "Labs User Behaviour",
    "Sandbox User Behaviour",
  ];
  const lab = [
    "Live Labs Dashboard",
    "Live Sandbox Dashboard",
    "Labs User Behaviour",
    "Sandbox User Behaviour",
    "Labs Validation Report",
  ];
  const hasLabMonitorItems = labMonitorItems.some((item) =>
    privileges?.privileges?.includes(item)
  );
  const hasLab = lab.some((item) => privileges?.privileges?.includes(item));

  return (
    <div className="sidebar">
      <Shape />
      <>
        {!privileges?.allow_whitelabeling && (
          <div className="copyright-link">
            {/* {SidebarProps.txt}
            <a>{SidebarProps.txt_link}</a> */}
          </div>
        )}
      </>
      <div className="links-block">
        <ul>
          {!privileges?.is_owner || privileges?.is_employee
            ? priv_access.map((item, key) => {
                if (
                  !privileges?.is_owner ||
                  privileges?.privileges.includes(
                    "Subscriptions" || "Courses" || "Learning Path"
                  )
                ) {
                  if (item?.nav_link === "Enrollments") {
                    return (
                      <MenuItem privileges={privileges} key={key} item={item} />
                    );
                  }
                }
              })
            : ""}
          {SidebarProps.links_first.map((item, key) => {
            if (privileges?.is_trail && item.path === "/courses") {
              return;
            }
            if (
              privileges?.is_employee &&
              !privileges?.enable_lab_validation &&
              !hasLabMonitorItems &&
              item.nav_link === "Lab Monitors"
            ) {
              return;
            }
            if (
              privileges?.is_employee &&
              !hasLab &&
              item.nav_link === "Lab Monitors"
            ) {
              return;
            } else if (
              privileges?.enable_lab_validation &&
              item.nav_link === "Lab Monitors"
            ) {
              if (item.nav_link === "Labs Validation Report") {
                return (
                  <MenuItem privileges={privileges} key={key} item={item} />
                );
              }
            }
            if (
              privileges?.is_employee &&
              item.nav_link == "Courses Library" &&
              !privileges?.is_sitewide &&
              !privileges?.privileges.includes("Courses")
            ) {
              return <MenuItem privileges={privileges} key={key} item={item} />;
            }
            if (
              item.nav_link === "Custom Environment" &&
              !privileges?.enable_custom_sandbox &&
              !privileges?.enable_workspaces
            ) {
              return null;
            } else if (
              item.nav_link !== "Courses Library" &&
              (privileges?.is_owner ||
                (privileges?.is_employee &&
                  privileges?.privileges.includes(item.nav_link)))
            ) {
              if (item.path === "/courses-user-page") {
                if (privileges?.privileges.includes("Courses")) return;
              } else
                return (
                  <MenuItem privileges={privileges} key={key} item={item} />
                );
            }
          })}
        </ul>
      </div>
      <div className="links-block">
        <ul>
          {SidebarProps?.links_sec?.map((nav_list, index) => {
            if (privileges?.is_trail && nav_list.path === "/courses") {
              return;
            } else if (
              privileges?.is_super_admin &&
              (nav_list.path === "/new-launch" ||
                nav_list.path === "/release-notes")
            ) {
              return;
            }
            // if (privileges?.allow_whitelabeling && nav_list.path === "/support-page") {
            //   return;
            // }
            return (
              <li
                key={nav_list.nav_link}
                style={{ border: "none", borderRadius: "4px" }}
              >
                <NavLink exact to={nav_list.path} activeClassName="active">
                  <i className={`${nav_list.icon}`}></i>
                  <span style={{ color: "" }}>{nav_list.nav_link}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
