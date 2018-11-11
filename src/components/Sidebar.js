import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Button, Text, Switch } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';

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

export default class Sidebar extends Component {

  state = {
    isTimePickerPresent1: false,
    isTimePickerPresent2: false,
    isTimePickerPresent3: false,
    timer1: null,
    timer2: null,
    timer3: null,
    switch1: false,
    switch2: false,
    switch3: false
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

  componentDidMount() {

    let customPushNotification = getCustomPushNotification(this.handleNotification);

    customPushNotification.localNotificationSchedule({
      title: 'word',
      message: 'meaning meaning meaning meaning meaning meaning meaning meaning meaning',
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
    this.props.navigation.navigate('IELTSCard', { index: 10 });
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
        </Content>
      </Container>
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
