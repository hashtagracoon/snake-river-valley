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

class IELTSCard extends Component {

  state = {
    data: null
  }

  searchForWord = async () => {
    let [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[13], this.props.dbInstance));
    logger('await search for wrod done !');
    logger("err = " + err);
    logger("data = ");
    logger(data);

    if(!err) {
      this.setState({ data });
      logger("from database:");
      logger(this.state.data);
    }
  }

  componentWillMount = () => {
    this.searchForWord();
  }

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
/*
    let soundObject = new Audio.Sound();

    try {
      soundObject.loadAsync({ uri: "https://dictionary.cambridge.org" + url })
      .then(() => {
        soundObject.playAsync();
      });
    }
    catch(err) {
      logger(err);
    }*/
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

          { this.renderWikipediaSummary(data) }

          { this.renderAds() }

          </Content>
        </Container>

        </GestureRecognizer>
      )
    }
  }


/*
  render() {

    const data = this.state.data;

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

          <Text>{ ielts[0] }</Text>
          <Text>{ ielts[1] }</Text>
          <Text>{ ielts[2] }</Text>

        </Content>

      </Container>

      </GestureRecognizer>
    );
  }

  */

}

export default connect(
  (state) => {
    return {
      dbInstance: state.dbState.dbInstance
    };
  },
  null
)(IELTSCard);
