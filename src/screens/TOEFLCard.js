import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Drawer, Container, Header, Left, Right, Title, Icon, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { toefl } from '../resources/toefl';
import { connect } from 'react-redux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { StackActions, NavigationActions } from 'react-navigation';

const length = 4845;

class TOEFLCard extends Component {

  state = {
    data: [{index: 1, name:'a'}, {index: 2, name:'b'}, {index: 3, name:'c'}, {index: 4, name:'d'}, {index: 5, name:'e'}]
  }

  _renderItem = (item) => {
    return (
      <View>
      <Text>{ item.index }</Text>
      <Text>{ item.name }</Text>
      </View>
    );
  }

  _keyExtractor = (item) => {
    return item.index;
  }

  _onEndReached = () => {
    console.log('get new data!');
    let newDataIndex = this.state.data[this.state.data.length - 1].index + 1;
    this.setState({
      data: this.state.data.concat([{ index: newDataIndex, name: 'n' }])
    });
  }

  _onScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.x === 0) {
      console.log('reach beginning@@');
      let newDataIndex = this.state.data[0].index - 1;
      this.setState({
        data: [{ index: newDataIndex, name: 'm' }].concat(this.state.data)
      }, () => { console.log(this.state.data); });
    }
  }

  render() {
    return (

      <Container>
        <View style={{ flex:1 }}>

          <FlatList
          extraData={this.state}
            horizontal={true}
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={ 0.8 }
            onEndReached = { this._onEndReached}
            onScroll={this._onScroll}
  scrollEventThrottle={0}
          />

        </View>
      </Container>

    );
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
)(TOEFLCard);
