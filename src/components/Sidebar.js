import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, View, List, ListItem, Left, Body, Right, Icon, Button, Text, Switch, Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import CustomNotification from '../api/CustomNotification';
import Notification from '../asyncstorage/Notification';
import { logger } from '../api/Debugger';

class Sidebar extends Component {

  state = {
    isTimePickerPresent: false,

    notificationStartDate: null,
    notificationEnable: false,
    notificationType: 'ielts',
  }

  componentWillMount = async () => {
    let notificationType = await Notification.getType();
    this.setState({ notificationType });
    let notificationEnable = await Notification.getEnable();
    this.setState({ notificationEnable });
    let notificationStartDate = await Notification.getStartDate();
    this.setState({ notificationStartDate });
  }

  onPickerValueChange = async (notificationType) => {
    this.setState({ notificationType });
    await Notification.setType(notificationType);
  }

  showTimePicker = () => {
    this.setState({ isTimePickerPresent: true });
  }

  hideTimePicker = () => {
    this.setState({ isTimePickerPresent: false });
  }

  handleTimer = (notificationStartDate) => {
    // save data only
    this.setState({ notificationStartDate }, () => {
      logger(`notification start date set to ${this.state.notificationStartDate}`);
      Notification.setStartDate(notificationStartDate);
    });
    this.setState({ notificationEnable: true }, () => {
      logger('notification enabled!');
      Notification.setEnable(true);
    });
    this.setState({ isTimePickerPresent: false });

    // setup real notification here
    const customNotification = new CustomNotification(this.props.navigation, this.props.dbInstance, this.state.notificationStartDate);
    customNotification.cancelNotification(); // cancel old notification, just in case
    customNotification.createNotification();
  }

  handleSwitch = (notificationEnable) => {
    this.setState({ notificationEnable }, () => {
      logger('notification enable = ' + notificationEnable);
      Notification.setEnable(notificationEnable);

      let tempDate = (this.state.notificationStartDate) ? this.state.notificationStartDate : new Date(Date.now());
      tempDate.setSeconds(0);
      tempDate.setMilliseconds(0);
      //tempDate.setDate(tempDate.setSeconds(0));
      logger('temp date = ' + tempDate);

      const customNotification = new CustomNotification(this.props.navigation, this.props.dbInstance, tempDate);

      if(!notificationEnable) {
        customNotification.cancelNotification();
      }
      else {
        this.setState({ notificationStartDate: tempDate }, () => {
          Notification.setStartDate(tempDate);
        });
        customNotification.cancelNotification(); // cancel old notification, just in case
        customNotification.createNotification();
      }

    });
  }

  render() {

    let notification = (this.state.notificationEnable) ?
      <Icon active name="md-notifications" /> :
      <Icon active name="md-notifications-off" />;

    let textStyle =  (!this.state.notificationEnable && this.state.notificationStartDate) ?
      { color: 'grey' } : {};

    let timer  = (this.state.notificationStartDate) ?
      <Text style={ textStyle }>{ this.state.notificationStartDate.toLocaleTimeString().slice(0, -3) }</Text> :
      <Text uppercase={ false }>Set Time</Text>;

    let defaultTime = (this.state.notificationStartDate) ?
      new Date(this.state.notificationStartDate) :
      new Date();

    return (
      <Container>
        <Content>

          <List>

            <ListItem itemDivider style={{ backgroundColor: '#3F51B5', alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: 'white', fontFamily: 'Lato-Bold' }}>Notification Setup</Text>
            </ListItem>

            <ListItem>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={ this.state.notificationType }
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
                  { notification }
                </Button>
                <Text style={{ fontFamily: 'sans-serif-light' }}>Notification 1</Text>
              </Left>
              <Right>
                <Switch value={ this.state.notificationEnable } onValueChange={ this.handleSwitch }/>
              </Right>
            </ListItem>

            <ListItem>
              <Content>
              <Button block bordered onPress={ this.showTimePicker }>
                { timer }
              </Button>
              </Content>
              <DateTimePicker
                date={ defaultTime }
                mode={ 'time' }
                isVisible={ this.state.isTimePickerPresent }
                onConfirm={ this.handleTimer }
                onCancel={ this.hideTimePicker }
              />
            </ListItem>

          </List>

        </Content>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'sans-serif-light'
  }
});

export default connect(
  (state) => {
    return {
      dbInstance: state.dbState.dbInstance
    };
  },
  null
)(Sidebar);
