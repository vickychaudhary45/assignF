// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const isLoggedIn = user_data?.data?.user_id;
  let token = `/?token=${user_data?.data?.token}`


  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          ((user_data?.data?.is_owner === 1) || user_data?.data?.portal_switch) ? <Component {...props} /> : window.open(`${process.env.REACT_APP_LEARN_URL}/my-training${token}`, "_self")
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute