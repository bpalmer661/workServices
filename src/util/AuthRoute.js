import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
  

const AuthRoute = ({component: Component, authenticated, ...rest}) => (

<Route
{...rest}
render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props}/>}
/>
)

// const mapStateToProps = state => ({ user: state.user })
///lesson 25////////////////
const mapStateToProps = (state) => ({ authenticated: state.user.authenticated })
///lesson 25////////////////


AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}
  

export default connect(mapStateToProps)(AuthRoute);
