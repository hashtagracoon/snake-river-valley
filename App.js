import React, { Component } from 'react';
import { Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Menu from './src/screens/Menu';
import Sidebar from './src/components/Sidebar';
import PushNotification from 'react-native-push-notification';

export default class App extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + (60 * 1000)) // in 60 secs
    });
  }

  render() {
    return (
      <Sidebar />
    );
  }

}
