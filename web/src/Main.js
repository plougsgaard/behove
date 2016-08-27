import React from 'react'

import { connect } from 'react-redux'

import { actions } from './app/reducers/auth'

const Main = ({ counter, dispatch }) => (
  <div className='align-center'>
    <div className='header'>
      <h2>Playground</h2>
    </div>
    <p className='section'>
      Here shall be things of plenty. {counter}
    </p>
    <p className='section'>
      <button onClick={(e) => { dispatch(actions.loginSubmit({ email: 'a@a.a', password: 'secret' })) }}>LOGIN_SUBMIT</button>
      <button onClick={(e) => { dispatch(actions.logout()) }}>LOGOUT</button>
    </p>
  </div>
)

const stateToProps = (state) => ({ counter: state.counter })

export default connect(stateToProps)(Main)
