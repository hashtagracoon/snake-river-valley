import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { ielts } from '../resources/ielts';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import DatabaseSearcher from '../api/DatabaseSearcher';
import to from '../api/To';
import { logger } from '../api/Debugger';
import Sound from 'react-native-sound';
import WordIndexer from '../asyncstorage/WordIndex';
import { StackActions, NavigationActions } from 'react-navigation';
import Constants from '../asyncstorage/Constants';

class IELTSCard extends Component {

  state = {
    data: null,
    index: 0
  }

  searchForWord = async (index) => {

    for(let i = 0; i < Constants.wordCacheLength; i++) {
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log(this.props.wordCache.get(i)[0].title);
      console.log("-------------------------------------------------------------------------------------------------------");
      /*
      if(this.props.wordCache.get(i).title === ielts[index]) {
        this.setState({ data: this.props.wordCache.get(i) });
        console.log('CACHE HIT!');
        return;
      }
      */
    }

    logger('index = ' + index);
    logger(index);
    logger('word = ' + ielts[index]);
    let [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[index], this.props.dbInstance));
    logger('await search for word done !');
    logger("err = " + err);
    logger("data = ");
    logger(data);

    if(!err) {
      this.setState({ data });
      logger("from database:");
      logger(this.state.data);
    }
  }

  componentWillMount = async () => {
    const index = await WordIndexer.getWordIndex('ielts');
    this.setState({ index });
    this.searchForWord(index);
  }

  gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  onSwipeLeft(gestureState) {
    console.log("swipe left");
    let tempIndex = (this.state.index + 1 >= Constants.ieltsLength) ? this.state.index : this.state.index + 1;
    WordIndexer.setWordIndex('ielts', tempIndex);

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

  onSwipeRight(gestureState) {
    console.log('swipe right');
    let tempIndex = (this.state.index - 1 < 0) ? this.state.index : this.state.index - 1;
    WordIndexer.setWordIndex('ielts', tempIndex);

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

  playTrack = (url) => {

    const callback = (error, sound) => {
      if (error) {
        logger(error.message);
        return;
      }

      sound.play(() => {
        sound.release();
      });
    };

    const sound = new Sound(url, null, error => callback(error, sound));
  }

  renderWaitingView = () => {
    return (
      <Content padder contentContainerStyle={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Content>
    );
  }

  renderMainEntries = (wordEntries) => {

    const renderPron = (pron) => {
      if(pron !== "") {
        return (
          <Text>/{ pron }/</Text>
        );
      }
    };

    const renderMp3 = (mp3) => {
      if(mp3 != null) {
        return (
          <Button transparent onPress={ () => this.playTrack(mp3) }>
            <Icon name="ios-volume-up" />
          </Button>
        );
      }
    };

    return (
      wordEntries.map((entry, i) => {
        return (
          <Card key={ i }>

            <CardItem header bordered>
              <Text>{ entry.title }</Text>
            </CardItem>

            <CardItem bordered>
              <Text>{ entry.pos }{ entry.gram }  </Text>
              { renderPron(entry.pron) }
              { renderMp3(entry.mp3) }
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

  renderWikipediaSummary = (wordEntries) => {
    return (
      wordEntries.map((entry, i) => {
        return (
          <Card key={ i }>
            <CardItem header bordered>
              <Text>{ entry.title }</Text>
            </CardItem>
            <CardItem bordered key={ i }>
              <Body>
                <Text>
                  { entry.meanings[0].meaning }
                </Text>
              </Body>
            </CardItem>
          </Card>
        );
      })
    );
  }

  renderAds = () => {
    /*
    return (
      <Card>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-4788516135632439/5282164079"
          didFailToReceiveAdWithError={ () => { logger("admob error"); } }/>
      </Card>
    );*/
  }

  render() {

    const data = this.state.data;

    if(!data) {
      return (
        <Container>
          { this.renderWaitingView() }
        </Container>
      );
    }
    else if(data[0].from === "Cambridge") {
      logger("Can Render Result Now.");
      logger(data);
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

          <Header>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={ this.menuButtonOnPress }>
                <Icon name="home" />
              </Button>
            </Left>
            <Body style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{this.state.data[0].title}</Text>
              <Text style={{ color: 'white' }}>{ this.state.index + 1 } / { Constants.ieltsLength }</Text>
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
    else if(data[0].from === "Wikipedia") {
      logger("Can Render Result Now. (from wiki)");
      //logger(result);
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
          <Content padder>

          <Header>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={ this.menuButtonOnPress }>
                <Icon name="home" />
              </Button>
            </Left>
            <Body style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{this.state.data[0].title}</Text>
              <Text style={{ color: 'white' }}>{ this.state.index + 1 } / { length }</Text>
            </Body>
            <Right style={{ flex: 1 }}></Right>
          </Header>

          { this.renderWikipediaSummary(data) }

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
      dbInstance: state.dbState.dbInstance,
      wordCache: state.wordCacheState.ieltsCache
    };
  },
  null
)(IELTSCard);
