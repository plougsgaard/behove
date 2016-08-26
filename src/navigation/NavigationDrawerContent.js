import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Content, List, ListItem, Text, Icon } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'

const DrawerContent = (props, { drawer }) => {
  const navigate = (action) => () => {
    drawer.toggle()
    action()
  }
  return (
    <Container>
      <Content>
        <List style={{ paddingRight: 10 }}>
          <ListItem button iconLeft onPress={navigate(NavigationActions.home)}>
            <Icon iconFamily='Foundation' name='home' style={{ width: 40, justifyContent: 'center', textAlign: 'center' }} />
            <Text>Home</Text>
          </ListItem>
          <ListItem button iconLeft onPress={navigate(NavigationActions.profile)}>
            <Icon iconFamily='FontAwesome' name='barcode' style={{ width: 40, justifyContent: 'center', textAlign: 'center' }} />
            <Text>Scan</Text>
          </ListItem>
          <TouchableOpacity>
            <ListItem button iconLeft onPress={navigate(NavigationActions.settings)}>
              <Icon iconFamily='MaterialIcons' name='settings' style={{ width: 40, justifyContent: 'center', textAlign: 'center' }} />
              <Text>Settings</Text>
              <Text note>...</Text>
            </ListItem>
          </TouchableOpacity>
        </List>
      </Content>
    </Container>
  )
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
