import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Button, Text, Switch, Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import Constants from '../asyncstorage/Constants';
import NotificationType from '../asyncstorage/NotificationType';
import { mostCommon } from '../resources/mostCommon';
import { ielts } from '../resources/ielts';
import { toefl } from '../resources/toefl';
import { gre } from '../resources/gre';
import { sat } from '../resources/sat';
import DatabaseSearcher from '../api/DatabaseSearcher';
import { connect } from 'react-redux';
import to from '../api/To';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let getCustomPushNotification = (handleNotification) => {
  PushNotification.configure({
    onNotification: function(notification) {
      handleNotification(notification);
    },
    popInitialNotification: true,
    requestPermissions: true
  });
  return PushNotification;
}

class Sidebar extends Component {

  state = {
    isTimePickerPresent1: false,
    isTimePickerPresent2: false,
    isTimePickerPresent3: false,
    timer1: null,
    timer2: null,
    timer3: null,
    switch1: false,
    switch2: false,
    switch3: false,

    selected: 'ielts',
    index: 0
  }

  onPickerValueChange = async (selected) => {
    this.setState({ selected });
    await NotificationType.setType(selected);
  }

  showTimePicker1 = () => {
    this.setState({ isTimePickerPresent1: true });
  }

  hideTimePicker1 = () => {
    this.setState({ isTimePickerPresent1: false });
  }

  showTimePicker2 = () => {
    this.setState({ isTimePickerPresent2: true });
  }

  hideTimePicker2 = () => {
    this.setState({ isTimePickerPresent2: false });
  }

  showTimePicker3 = () => {
    this.setState({ isTimePickerPresent3: true });
  }

  hideTimePicker3 = () => {
    this.setState({ isTimePickerPresent3: false });
  }

  handleTimer1 = (timer1) => {
    this.setState({ timer1: timer1 }, () => {
      console.log(this.state.timer1);
    });
    this.setState({ switch1: true });
    this.setState({ isTimePickerPresent1: false });

    PushNotification.cancelLocalNotifications({id: '1000'});
  }

  handleTimer2 = (timer2) => {
    this.setState({ timer2: timer2 });
    this.setState({ switch2: true });
    this.setState({ isTimePickerPresent2: false });
  }

  handleTimer3 = (timer3) => {
    this.setState({ timer3: timer3 });
    this.setState({ switch3: true });
    this.setState({ isTimePickerPresent3: false });
  }

  handleSwitch1 = (switch1) => {
    this.setState({ switch1 });
  }

  handleSwitch2 = (switch2) => {
    this.setState({ switch2 });
  }

  handleSwitch3 = (switch3) => {
    this.setState({ switch3 });
  }

  async componentDidMount() {

    let customPushNotification = getCustomPushNotification(this.handleNotification);

    let notificationType = await NotificationType.getType();

    let index = 0;
    switch(notificationType) {
      case 'mostCommon':
        index = getRandomInt(Constants.mostCommonLength - 1);
        break;
      case 'ielts':
        index = getRandomInt(Constants.ieltsLength - 1);
        break;
      case 'toefl':
        index = getRandomInt(Constants.toeflLength - 1);
        break;
      case 'gre':
        index = getRandomInt(Constants.greLength - 1);
        break;
      case 'sat':
        index = getRandomInt(Constants.satLength - 1);
        break;
      default:
        break;
    }
    this.setState({ index });

    let title = '';
    let message = '';
    let err = null;
    let data = null;
    switch(notificationType) {
      case 'mostCommon':
        [err, data] = await to(DatabaseSearcher.searchDatabase(mostCommon[index], this.props.dbInstance));
        break;
      case 'ielts':
        [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[index], this.props.dbInstance));
        break;
      case 'toefl':
        [err, data] = await to(DatabaseSearcher.searchDatabase(toefl[index], this.props.dbInstance));
        break;
      case 'gre':
        [err, data] = await to(DatabaseSearcher.searchDatabase(gre[index], this.props.dbInstance));
        break;
      case 'sat':
        [err, data] = await to(DatabaseSearcher.searchDatabase(sat[index], this.props.dbInstance));
        break;
      default:
        break;
    }
    title = data[0].title;
    message = data[0].meanings[0].meaning;

    customPushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: new Date(Date.now() + (10 * 1000)), // in 10 secs
      id: '1000',
      userInfo: {
        id: '1000'
      },
      number: 0,
      repeatType: 'minute'
    });
  }

  handleNotification = (notification) => {
    console.log("in handle notification:");
    //let index = getRandomInt(Constants.ieltsLength - 1);
    this.props.navigation.navigate('IELTSCard', { index: this.state.index });
  }

  render() {

    let notification1 = (this.state.switch1) ?
      <Icon active name="md-notifications" /> :
      <Icon active name="md-notifications-off" />;

    let notification2 = (this.state.switch2) ?
      <Icon active name="md-notifications" /> :
      <Icon active name="md-notifications-off" />;

    let notification3 = (this.state.switch3) ?
      <Icon active name="md-notifications" /> :
      <Icon active name="md-notifications-off" />;

    let textStyle1 =  (!this.state.switch1 && this.state.timer1) ?
      { color: 'grey' } : {};

    let textStyle2 =  (!this.state.switch2 && this.state.timer2) ?
      { color: 'grey' } : {};

    let timer1  = (this.state.timer1) ?
      <Text style={ textStyle1 }>{ this.state.timer1.toLocaleTimeString().slice(0, -3) }</Text> :
      <Text>Select a Time</Text>;

    let timer2  = (this.state.timer2) ?
      <Text>{ this.state.timer2.toLocaleTimeString().slice(0, -3) }</Text> :
      <Text>Select a Time</Text>;

    let timer3  = (this.state.timer3) ?
      <Text>{ this.state.timer3.toLocaleTimeString().slice(0, -3) }</Text> :
      <Text>Select a Time</Text>;

    let defaultTime1 = (this.state.timer1) ?
      new Date(this.state.timer1) :
      new Date();

    let defaultTime2 = (this.state.timer2) ?
      new Date(this.state.timer2) :
      new Date();

    let defaultTime3 = (this.state.timer3) ?
      new Date(this.state.timer3) :
      new Date();

    let light1 = (this.state.switch1) ? "light" : "";
    let light2 = (this.state.switch2) ? "light" : "";
    let light3 = (this.state.switch3) ? "light" : "";

    return (
      <Container>
        <Content>

          <List>

            <ListItem itemDivider>
              <Text>Notification Setup</Text>
            </ListItem>

            <ListItem>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={ this.state.selected }
                onValueChange={ this.onPickerValueChange }
                >
                <Picker.Item label="Most Common" value="mostCommon" />
                <Picker.Item label="IELTS" value="ielts" />
                <Picker.Item label="TOEFL" value="toefl" />
                <Picker.Item label="GRE" value="gre" />
                <Picker.Item label="SAT" value="sat" />
              </Picker>
            </ListItem>

            <ListItem>
              <Left>
                <Button transparent>
                  { notification1 }
                </Button>
                <Text>Notification 1</Text>
              </Left>
              <Right>
                <Switch value={ this.state.switch1 } onValueChange={ this.handleSwitch1 }/>
              </Right>
            </ListItem>

            <ListItem>
              <Content>
              <Button block bordered onPress={ this.showTimePicker1 }>
                { timer1 }
              </Button>
              </Content>
              <DateTimePicker
                date={ defaultTime1 }
                mode={ 'time' }
                isVisible={ this.state.isTimePickerPresent1 }
                onConfirm={ this.handleTimer1 }
                onCancel={ this.hideTimePicker1 }
              />
            </ListItem>

            <ListItem>
              <Left>
                <Button transparent>
                  { notification2 }
                </Button>
                <Text>Notification 2</Text>
              </Left>
              <Right>
                <Switch value={ this.state.switch2 } onValueChange={ this.handleSwitch2 }/>
              </Right>
            </ListItem>

            <ListItem>
              <Content>
              <Button block bordered onPress={ this.showTimePicker2 }>
                { timer2 }
              </Button>
              </Content>
              <DateTimePicker
                date={ defaultTime2 }
                mode={ 'time' }
                isVisible={ this.state.isTimePickerPresent2 }
                onConfirm={ this.handleTimer2 }
                onCancel={ this.hideTimePicker2 }
              />
            </ListItem>

            <ListItem>
              <Left>
                <Button transparent>
                  { notification3 }
                </Button>
                <Text>Notification 3</Text>
              </Left>
              <Right>
                <Switch value={ this.state.switch3 } onValueChange={ this.handleSwitch3 }/>
              </Right>
            </ListItem>

            <ListItem>
              <Content>
              <Button block bordered onPress={ this.showTimePicker3 }>
                { timer3 }
              </Button>
              </Content>
              <DateTimePicker
                date={ defaultTime3 }
                mode={ 'time' }
                isVisible={ this.state.isTimePickerPresent3 }
                onConfirm={ this.handleTimer3 }
                onCancel={ this.hideTimePicker3 }
              />
            </ListItem>

          </List>

          <View style={{ flex: 1 }}>
          </View>
        </Content>
      </Container>
    );
  }

}

export default connect(
  (state) => {
    return {
      dbInstance: state.dbState.dbInstance
    };
  },
  null
)(Sidebar);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 36
  }
});
