import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import Sidebar from '../components/Sidebar';

Drawer.defaultProps.styles.mainOverlay.elevation = 0;

export default class Menu extends Component {

  openDrawer = () => {
    this.drawer._root.open();
  }

  closeDrawer = () => {
    this.drawer._root.close();
  }

  menuButtonOnPress = () => {
    this.openDrawer();
  }

  ieltsButtonOnPress = () => {
    this.props.navigation.navigate("WordCard");
  }

  render() {
    return (
      <Drawer
        ref={ (ref) => { this.drawer = ref; } }
        content={ <Sidebar /> }
        onClose={ this.closeDrawer }
      >

      <Container>

        <Header>
          <Left>
            <Button transparent onPress={ this.menuButtonOnPress }>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Daily Vocabulary</Title>
          </Body>
        </Header>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>Most Common 3000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered onPress={ this.ieltsButtonOnPress }>
            <Text uppercase={ false }>IELTS 4000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>TOEFL 5000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>GRE 5000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>SAT 3000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
        </View>
        <View style={ styles.view }>
        </View>

      </Container>
      </Drawer>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 36
  }
});
