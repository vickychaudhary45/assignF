import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const isLoggedIn = user_data?.data?.user_id;
  let token = `/?token=${user_data?.data?.token}`


  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          (<Component {...props} />)
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
