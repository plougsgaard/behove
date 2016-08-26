import React from 'react'

import { connect } from 'react-redux'

const Main = ({ counter, dispatch }) => (
  <div className='align-center'>
    <div className='header'>
      <h2>Playground</h2>
    </div>
    <p className='section'>
      Here shall be things of plenty. {counter}
    </p>
    <p className='section'>
      <button onClick={(e) => { dispatch({ type: 'INCREMENT_ASYNC' }) }}>Do the limbo</button>
    </p>
  </div>
)

const stateToProps = (state) => ({ counter: state.counter })

export default connect(stateToProps)(Main)
