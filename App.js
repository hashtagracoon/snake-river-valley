import React, { Component } from 'react';
import { Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Menu from './src/screens/Menu';
import Sidebar from './src/components/Sidebar';

export default class App extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <Sidebar />
    );
  }

}
