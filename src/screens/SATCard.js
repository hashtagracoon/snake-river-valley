import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { sat } from '../resources/sat';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { StackActions, NavigationActions } from 'react-navigation';

const length = 2664;

export default class SATCard extends Component {

  gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  onSwipeLeft(gestureState) {
    console.log("swipe left");

    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({
        routeName: "IELTSCard",
        params: {
          transition: 'fromLeft'
        }
      }) ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }

  onSwipeRight(hestureState) {
    console.log('swipe right');

    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({
        routeName: "IELTSCard",
        params: {
          transition: 'fromRight'
        }
      }) ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (

      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={ this.gestureConfig }
        style={{
          flex: 1
        }}
        >

      <Container style={{ backgroundColor: 'blue' }}>

        <Content>

          <Text>{ sat[0] }</Text>
          <Text>{ sat[1] }</Text>
          <Text>{ sat[2] }</Text>

        </Content>

      </Container>

      </GestureRecognizer>
    );
  }

}
