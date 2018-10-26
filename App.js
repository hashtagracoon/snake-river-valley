import React, { Component } from 'react';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Menu from './src/screens/Menu';
import Sidebar from './src/components/Sidebar';
import IELTSCard from './src/screens/IELTSCard';
import SATCard from './src/screens/SATCard';
import PushNotification from 'react-native-push-notification';
import { createStackNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';

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

const AppNavigator = createStackNavigator(
  {
    Menu: { screen: Menu },
    Sidebar: { screen: Sidebar },
    IELTSCard: { screen: IELTSCard },
    SATCard: { screen: SATCard }
  },
  {
    initialRouteName: 'Menu',
    headerMode: 'none',
    transitionConfig: () => fromLeft()
  }
);

export default class App extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();

    let customPushNotification = getCustomPushNotification(this.handleNotification);

    customPushNotification.localNotificationSchedule({
      title: 'word',
      message: 'meaning meaning meaning meaning meaning meaning meaning meaning meaning',
      date: new Date(Date.now() + (60 * 1000)), // in 60 secs
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
    console.log(notification);
  }

  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }

}
