import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    redirect: pathname,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated === true ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect
              to={{
                pathname,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
  
  PrivateRoute.defaultProps = { redirect: '/login' }
  
  export default PrivateRoute