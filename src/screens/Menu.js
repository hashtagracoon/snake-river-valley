import React, { Component } from 'react';
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
