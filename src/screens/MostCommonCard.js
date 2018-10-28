import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { mostCommon } from '../resources/mostCommon';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default class MostCommonCard extends Component {

  gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  onSwipeLeft(gestureState) {
    console.log("swipe left");
    this.props.navigation.navigate({
      routeName: 'SATCard',
      params: {
        transition: 'fromLeft'
      }
    });
  }

  onSwipeRight(hestureState) {
    console.log('swipe right');
    this.props.navigation.navigate({
      routeName: 'SATCard',
      params: {
        transition: 'fromRight'
      }
    });
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

      <Container>

        <Content>

          <Text>{ mostCommon[0] }</Text>
          <Text>{ mostCommon[1] }</Text>
          <Text>{ mostCommon[2] }</Text>

        </Content>

      </Container>

      </GestureRecognizer>
    );
  }

}
