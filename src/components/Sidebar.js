import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Button, Text, Switch, Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import CustomNotification from '../api/CustomNotification';

class Sidebar extends Component {

  state = {
    isTimePickerPresent1: false,
    isTimePickerPresent2: false,
    timer1: null,
    timer2: null,
    switch1: false,
    switch2: false,

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

  handleSwitch1 = (switch1) => {
    this.setState({ switch1 });
  }

  handleSwitch2 = (switch2) => {
    this.setState({ switch2 });
  }

  componentDidUpdate(prevProps) {
    console.log('in components did mount:');
    console.log(this.props.dbInstance);
    customNotification = new CustomNotification(this.props.navigation, this.props.dbInstance);
    customNotification.createNotification();
  }

  render() {

    let notification1 = (this.state.switch1) ?
      <Icon active name="md-notifications" /> :
      <Icon active name="md-notifications-off" />;

    let notification2 = (this.state.switch2) ?
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

    let defaultTime1 = (this.state.timer1) ?
      new Date(this.state.timer1) :
      new Date();

    let defaultTime2 = (this.state.timer2) ?
      new Date(this.state.timer2) :
      new Date();

    let light1 = (this.state.switch1) ? "light" : "";
    let light2 = (this.state.switch2) ? "light" : "";

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

          </List>

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
