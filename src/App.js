import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { renderRoutes, privateRenderRoutes } from "./config/routes";
import PrivateRoute from './PrivateRoute'
import { CheckPrivileges } from './PermissionContexts.js';
import "./common.scss";
import Error404 from "../src/shared/ErrorPage";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [loading, setLoading] = useState(true);
  const currentPath = window.location.pathname;
  const initialCurrentPath = currentPath.split("/")[1];
  const [isRouteAvailable, setIsRouteAvailable] = useState(true);
  const priv = !loading
    ? JSON.parse(localStorage.getItem("privilegesInfo"))
    : [];

  const initialPath = currentPath.split("/").pop();

  useEffect(() => {
    setLoading(false);
    const allRoutes = [...renderRoutes, ...privateRenderRoutes];
    const routeExists = allRoutes.some(([key, rout]) => {
      const initialPath = rout.path.split("/")[1];
      return initialPath === initialCurrentPath;
    });
    setIsRouteAvailable(routeExists);
  }, [initialCurrentPath]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="App">
        {priv?.restrict_privileges?.includes(`/${initialPath}`) ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Error404 />
          </div>
        ) : isRouteAvailable ? (
          <>
            <Suspense
              fallback={
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                  }}
                ></div>
              }
            >
              <BrowserRouter>
                <Switch>
                  {renderRoutes.map(([key, route]) => (
                    <Route
                      key={key}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                  <CheckPrivileges>
                    {privateRenderRoutes.map(([key, route]) => (
                      <PrivateRoute
                        key={key}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                      />
                    ))}
                  </CheckPrivileges>
                </Switch>
              </BrowserRouter>
            </Suspense>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Error404 />
          </div>
        )}
      </div>
    )
  );
};

export default App;
