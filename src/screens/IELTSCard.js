import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { ielts } from '../resources/ielts';

export default class IELTSCard extends Component {

  render() {
    return (

      <Container>

        <Content>

          <Text>{ ielts[0] }</Text>
          <Text>{ ielts[1] }</Text>
          <Text>{ ielts[2] }</Text>

        </Content>

      </Container>
    );
  }

}
