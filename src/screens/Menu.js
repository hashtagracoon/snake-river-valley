import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import Sidebar from '../components/Sidebar';
import CustomNotification from '../api/CustomNotification';
import Notification from '../asyncstorage/Notification';
import { connect } from 'react-redux';
import { logger } from '../api/Debugger';
import SplashScreen from 'react-native-splash-screen';

Drawer.defaultProps.styles.mainOverlay.elevation = 0;

class Menu extends Component {

  openDrawer = () => {
    this.drawer._root.open();
  }

  closeDrawer = () => {
    this.drawer._root.close();
  }

  menuButtonOnPress = () => {
    this.openDrawer();
  }

  mostCommonOnPress = () => {
    this.props.navigation.navigate('MostCommonCard');
  }

  ieltsButtonOnPress = () => {
    this.props.navigation.navigate('IELTSCard');
  }

  toeflButtonOnPress = () => {
    this.props.navigation.navigate('TOEFLCard');
  }

  greButtonOnPress = () => {
    this.props.navigation.navigate('GRECard');
  }

  satButtonOnPress = () => {
    this.props.navigation.navigate('SATCard');
  }

  componentWillMount = () => {
    SplashScreen.hide();
  }

  componentDidMount = async () => {
    logger('*** componentDidMount ***');
    let notificationStartDate = await Notification.getStartDate();
    new CustomNotification(this.props.navigation, this.props.dbInstance, notificationStartDate).initNotification();
  }

  render() {
    return (
      <Drawer
        ref={ (ref) => { this.drawer = ref; } }
        content={ <Sidebar navigation={ this.props.navigation }/> }
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
          <Button block primary onPress={ this.mostCommonOnPress }>
            <Text uppercase={ false }>Most Common 3000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary onPress={ this.ieltsButtonOnPress }>
            <Text uppercase={ false }>IELTS 4000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary onPress={ this.toeflButtonOnPress }>
            <Text uppercase={ false }>TOEFL 5000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary onPress={ this.greButtonOnPress }>
            <Text uppercase={ false }>GRE 5000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary onPress={ this.satButtonOnPress }>
            <Text uppercase={ false }>SAT 3000 Words</Text>
          </Button>
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

export default connect(
  (state) => {
    return {
      dbInstance: state.dbState.dbInstance
    };
  },
  null
)(Menu);
