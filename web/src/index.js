import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import configureStore from './app/redux/store'
import './index.css'

const store = configureStore({
  development: true
})

const PreRoot = () => (
  <Root store={store} />
)

ReactDOM.render(
  <PreRoot />,
  document.getElementById('root')
)
