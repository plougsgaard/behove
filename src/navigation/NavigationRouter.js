import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import styles from './NavigationContainer.styles'
import NavigationDrawer from './NavigationDrawer'

import MenuButton from './MenuButton'
import BackButton from './BackButton'

import HomeScene from '../scenes/Home'
import ProfileScene from '../scenes/Profile'
import SettingsScene from '../scenes/Settings'
import ScanScene from '../scenes/Scan'

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#F1F1F1',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null
  }
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64
    style.marginBottom = computedProps.hideTabBar ? 0 : 50
  }
  return style
}

class NavigationRouter extends Component {
  render () {
    return (
      <Router getSceneStyle={getSceneStyle}>
        <Scene
          key='drawer'
          component={NavigationDrawer}
          renderBackButton={BackButton}
          passProps /* pass the renderBackButton to child scenes */
          hideNavBar={false}
          hideTabBar
        >
          <Scene
            key='drawerChildrenWrapper'
            navigationBarStyle={styles.navBar}
            titleStyle={styles.title}
            leftButtonIconStyle={styles.leftButton}
            rightButtonTextStyle={styles.rightButton}
          >
            <Scene
              key='home'
              component={HomeScene}
              title='Home'
              initial
              renderBackButton={MenuButton}
              type={ActionConst.RESET} />
            <Scene
              key='profile'
              component={ProfileScene}
              title='Profile'
              renderBackButton={MenuButton}
              type={ActionConst.RESET} />
            <Scene
              key='scan'
              component={ScanScene}
              title='Scan'
              renderBackButton={MenuButton}
              type={ActionConst.RESET} />
            <Scene
              key='settings'
              component={SettingsScene}
              title='Settings'
              renderBackButton={MenuButton}
              type={ActionConst.RESET} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
