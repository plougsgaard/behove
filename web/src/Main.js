import React from 'react'

import { connect } from 'react-redux'

import { delay } from 'redux-saga'

import { actions } from './app/reducers/auth'
import { postRequest } from './app/services/network'

async function clickHandler (e) {
  try {
    const response = await postRequest()
    await delay(2000)
    console.log('clickHandler response:', response)
  } catch (error) {
    console.warn(error)
  }
}

const Main = ({ auth, dispatch }) => (
  <div className='align-center'>
    <div className='header'>
      <h2>Playground</h2>
    </div>
    <p className='section'>
      Here shall be things of plenty.
    </p>
    <div className='section'>
      <h1>Network</h1>
      <button onClick={clickHandler}>Login with postRequest</button>
    </div>
    <div className='section'>
      <h1>Auth</h1>
      <p>{JSON.stringify(auth)}</p>
      <button onClick={(e) => { dispatch(actions.loginRequest({ email: 'a@a.a', password: 'secret' })) }}>LOGIN_REQUEST</button>
      <button onClick={(e) => { dispatch(actions.loginRequest({ email: 'a@a.a', password: 'secretz' })) }}>LOGIN_REQUEST_WRONG_CREDS</button>
      <button onClick={(e) => { dispatch(actions.logout()) }}>LOGOUT</button>
    </div>
  </div>
)

const stateToProps = ({ auth }) => ({ auth })

export default connect(stateToProps)(Main)
