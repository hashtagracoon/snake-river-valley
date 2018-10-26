import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { sat } from '../resources/sat';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class SATCard extends Component {

  render() {
    return (

      <Container>

        <Content>

          <Text>{ sat[0] }</Text>
          <Text>{ sat[1] }</Text>
          <Text>{ sat[2] }</Text>

        </Content>

      </Container>
    );
  }

}
