import React, { Component } from 'react';
import { Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { sat } from '../resources/sat';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import DatabaseSearcher from '../api/DatabaseSearcher';
import to from '../api/To';
import { logger } from '../api/Debugger';
import Sound from 'react-native-sound';
import WordIndexer from '../asyncstorage/WordIndex';
import { StackActions, NavigationActions } from 'react-navigation';
import Constants from '../asyncstorage/Constants';
import { AdMobBanner } from 'react-native-admob';

class SATCard extends Component {

  state = {
    data: null,
    index: 0
  }

  searchForWord = async (index) => {

    logger('current index = ' + index);
    logger('current word = ' + sat[index]);
    let [err, data] = await to(DatabaseSearcher.searchDatabase(sat[index], this.props.dbInstance));

    if(!err) {
      this.setState({ data });
    }
    else {
      logger('search from database fail...');
    }

  }

  componentWillMount = async () => {
    let index = 0;
    if(this.props.navigation.state.params && this.props.navigation.state.params.index) {
      index = this.props.navigation.state.params.index;
      WordIndexer.setWordIndex('sat', index);
    }
    else {
      index = await WordIndexer.getWordIndex('sat');
    }
    this.setState({ index });
    this.searchForWord(index);
  }

  menuButtonOnPress = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({
        routeName: "Menu"
      }) ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }

  onSwipeLeft(gestureState) {
    logger("<== swipe left");
    let tempIndex = (this.state.index + 1 >= Constants.satLength) ? this.state.index : this.state.index + 1;
    WordIndexer.setWordIndex('sat', tempIndex);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({
        routeName: "SATCard",
        params: {
          transition: 'fromLeft'
        }
      }) ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }

  onSwipeRight(gestureState) {
    logger('==> swipe right');
    let tempIndex = (this.state.index - 1 < 0) ? this.state.index : this.state.index - 1;
    WordIndexer.setWordIndex('sat', tempIndex);

    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({
        routeName: "SATCard",
        params: {
          transition: 'fromRight'
        }
      }) ],
      key: null
    });

    this.props.navigation.dispatch(resetAction);
  }

  playTrack = (mp3) => {

    const callback = (error, sound) => {
      if (error) {
        logger('play mp3 fail...');
        logger(error);
        return;
      }

      sound.play(() => {
        sound.release();
      });
    };

    const sound = new Sound(mp3, Sound.MAIN_BUNDLE, error => callback(error, sound));
  }

  renderPron = (pron) => {
    if(pron !== "") {
      return (
        <Text>/{ pron }/</Text>
      );
    }
  }

  renderMp3 = (mp3) => {
    if(mp3 != null) {
      return (
        <Button transparent onPress={ () => this.playTrack(mp3) }>
          <Icon name="ios-volume-up" />
        </Button>
      );
    }
  };

  renderMainEntries = (wordEntries) => {

    return (
      wordEntries.map((entry, i) => {
        return (
          <Card key={ i }>

            <CardItem header bordered>
              <Text>{ entry.title }</Text>
              { this.renderMp3(entry.mp3) }
            </CardItem>

            <CardItem bordered>
              <Text>{ entry.pos }{ entry.gram }  </Text>
              { this.renderPron(entry.pron) }
            </CardItem>

            { this.renderMeanings(entry.meanings) }

          </Card>
        )
      })
    );
  }

  renderMeanings = (meanings) => {
    return (
      meanings.map((entry, i) => {
        return (
          <CardItem bordered key={ i }>
            <Body>
              <Text style={{ fontWeight: "bold", marginBottom: 8, lineHeight: 22 }}>{ entry.meaning }</Text>

              { this.renderExamples(entry.egs) }

            </Body>
          </CardItem>
        )
      })
    );
  }

  renderExamples = (examples) => {
    return (
      examples.map((entry, i) => {
        if(i > 1) return;
        return (
          <Text style={{ fontStyle: "italic", marginBottom: 8, lineHeight: 22 }} key={ i }>{ entry }</Text>
        )
      })
    );
  }

  renderAds = () => {

    return (
      <Card>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adSize="banner"
          adUnitID="ca-app-pub-4788516135632439/6769623022"
          didFailToReceiveAdWithError={ () => { logger("&&& admob error &&&"); } }/>
      </Card>
    );
  }

  render() {

    const data = this.state.data;

    if(!data) {
      return (
        <Container>

          <Header>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={ this.menuButtonOnPress }>
                <Icon name="home" />
              </Button>
            </Left>
            <Body style={{ flex: 1, alignItems: 'center' }}>
            </Body>
            <Right style={{ flex: 1 }}></Right>
          </Header>

        </Container>
      );
    }
    else {
      logger("Can Render Result Now.");
      logger(data);
      return (
        <GestureRecognizer
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={ Constants.gestureConfig }
          style={{ flex: 1 }}
          >

        <Container>

          <Header>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={ this.menuButtonOnPress }>
                <Icon name="home" />
              </Button>
            </Left>
            <Body style={{ flex: 2, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontFamily: 'Lato-Bold' }}>{this.state.data[0].title}</Text>
              <Text style={{ color: 'white', fontFamily: 'Lato-Bold' }}>{ this.state.index + 1 } / { Constants.satLength }</Text>
            </Body>
            <Right style={{ flex: 1 }}></Right>
          </Header>

          <Content padder>

          { this.renderMainEntries(data) }

          { this.renderAds() }

          </Content>
        </Container>

        </GestureRecognizer>
      )
    }
  }

}

export default connect(
  (state) => {
    return {
      dbInstance: state.dbState.dbInstance
    };
  },
  null
)(SATCard);
