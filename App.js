/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import SplashScreen from 'react-native-splash-screen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Daily Vocabulary</Title>
          </Body>
        </Header>

        <Content padder>
          <Card transparent>
            <Button block bordered>
              <Text uppercase={ false }>Most Common 3000 Words</Text>
            </Button>
          </Card>

          <Card transparent>
            <Button block bordered>
              <Text uppercase={ false }>IELTS 4000 Words</Text>
            </Button>
          </Card>

          <Card transparent>
            <Button block bordered>
              <Text uppercase={ false }>TOEFL 5000 Words</Text>
            </Button>
          </Card>

          <Card transparent>
            <Button block bordered>
              <Text uppercase={ false }>GRE 5000 Words</Text>
            </Button>
          </Card>

          <Card transparent>
            <Button block bordered>
              <Text uppercase={ false }>SAT 3000 Words</Text>
            </Button>
          </Card>

          <Card transparent>
            <CardItem>
              <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Current Notification Time: 00:00</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
