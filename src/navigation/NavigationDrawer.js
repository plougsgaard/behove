import React, { PropTypes, Component } from 'react'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import DrawerContent from './NavigationDrawerContent'
import styles from './NavigationDrawer.styles'

class NavigationDrawer extends Component {
  static propTypes = {
    navigationState: PropTypes.object
  }

  render () {
    const { key, open, children } = this.props.navigationState
    return (
      <Drawer
        ref='navigation'
        open={open}
        onOpen={() => NavigationActions.refresh({ key, open: true })}
        onClose={() => NavigationActions.refresh({ key, open: false })}
        content={<DrawerContent />}
        styles={styles}
        tapToClose
        type='overlay'
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3} // magic number?
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
