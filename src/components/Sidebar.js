import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Button, Text, Switch } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class Sidebar extends Component {

  state = {
    isTimePickerPresent: false,
    timer1: null,
    timer2: null,
    timer3: null,
    switch1: false,
    switch2: false,
    switch3: false
  }

  showTimePicker = () => {
    this.setState({ isTimePickerPresent: true });
  }

  hideTimePicker = () => {
    this.setState({ isTimePickerPresent: false });
  }

  handleTimer1 = (timer1) => {
    this.setState({ timer1 });
  }

  handleTimer1 = (timer2) => {
    this.setState({ timer2 });
  }

  handleTimer1 = (timer3) => {
    this.setState({ timer3 });
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
              <Button block bordered onPress={ this.showTimePicker }>
                <Text>Select a Time</Text>
              </Button>
              </Content>
              <DateTimePicker
                mode={ 'time' }
                isVisible={ this.state.isTimePickerPresent }
                onConfirm={ this.handleTimer1 }
                onCancel={ this.hideTimePicker }
              />
            </ListItem>

          </List>
        </Content>
      </Container>
    );
  }
/*
  render() {
    return (
      <Container>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
            <Text>ok</Text>
          </View>
          <View style={{ flex: 2, backgroundColor: 'red' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Notification 1</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>HHMMSS</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Notification 2</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>HHMMSS</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Notification 3</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>HHMMSS</Text>
            </View>

          </View>
        </View>

      </Container>
    );
  }
  */
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 36
  }
});
