import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';

export default class Menu extends Component {
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

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>Most Common 3000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>IELTS 4000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>TOEFL 5000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>GRE 5000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
          <Button block primary bordered>
            <Text uppercase={ false }>SAT 3000 Words</Text>
          </Button>
        </View>

        <View style={ styles.view }>
        </View>
        <View style={ styles.view }>
        </View>

      </Container>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 36
  }
});
