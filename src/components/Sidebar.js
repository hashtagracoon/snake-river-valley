import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Text } from 'native-base';

export default class Sidebar extends Component {

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
}
