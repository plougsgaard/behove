import React from 'react'

import { connect } from 'react-redux'

import { actions } from './app/reducers/auth'

import { selectors } from './app/reducers'

const Main = ({ token, auth, dispatch }) => (
  <div className='align-center'>
    <div className='header'>
      <h2>Playground</h2>
    </div>
    <p className='section'>
      Here shall be things of plenty.
    </p>
    <div className='section'>
      <h1>Auth</h1>
      <p>Token via selector: {token}</p>
      <p>{JSON.stringify(auth)}</p>
      <button onClick={(e) => { dispatch(actions.loginRequest({ email: 'a@a.a', password: 'secret' })) }}>LOGIN_REQUEST</button>
      <button onClick={(e) => { dispatch(actions.loginRequest({ email: 'a@a.a', password: 'secretz' })) }}>LOGIN_REQUEST_WRONG_CREDS</button>
      <button onClick={(e) => { dispatch(actions.logout()) }}>LOGOUT</button>
      <button onClick={(e) => { dispatch(actions.renewSessionRequest()) }}>RENEW_SESSION_REQUEST</button>
    </div>
  </div>
)

const stateToProps = (state) => ({
  auth: state.auth,
  token: selectors.auth.getToken(state)
})

export default connect(stateToProps)(Main)
