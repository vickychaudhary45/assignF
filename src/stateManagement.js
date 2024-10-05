import { createContext, useReducer, useContext } from "react";

// create a context
const AppCtx = createContext(null);

// component to provide state via use reducer
export const AppState = props => {
  // update Initial value
  const initialState = {
    subscription: 0,
    course: 0,
    sandboxDetails: [],
    lab_token: null,
    sandboxData: null,
    is_sandbox_running: false,
    privileges: {},
    isLoadingPrivileges: false,
  };

  // define reducer
  const reducer = (currentState, action) => {
    // type and payload
    const { type, payload } = action;
    const newState = { ...currentState };

    // using switch case to update
    switch (type) {
      case "PRIVILEGES":
        newState.privileges = payload;
        return newState;
        
      case "ISLOADINGPRIVILEGES":
        newState.isLoadingPrivileges = payload;
        return newState;

      case "SET_SUBSCRIPTION":
        newState.subscription = payload;
        return newState;

      case "SET_COURSE":
        newState.course = payload;
        return newState;

      case "SET_SANDBOX_DETAILS":
        newState.sandboxDetails = payload;
        return newState;

      case "LAB_TOKEN":
        newState.lab_token = payload;
        return newState;

      case "CREATE_SANDBOX":
        newState.sandboxData = payload;
        return newState;

      case "SET_IS_SANDBOX_RUNNING":
        newState.is_sandbox_running = payload;
        return newState;

      default:
        return currentState;
    }
  };

  // create state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  // split dipatch to update type and payload
  const update = (type, payload) => {
    dispatch({ type, payload });
  };

  return <AppCtx.Provider value={{ state, update }}>{props.children}</AppCtx.Provider>;
};

// use the context in multiple page
export const useAppState = () => {
  return useContext(AppCtx);
};
