import React, { Component } from 'react';
import { Root } from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Menu from '../screens/Menu';
import Sidebar from '../components/Sidebar';
import MostCommonCard from '../screens/MostCommonCard';
import IELTSCard from '../screens/IELTSCard';
import TOEFLCard from '../screens/TOEFLCard';
import GRECard from '../screens/GRECard';
import SATCard from '../screens/SATCard';
import PushNotification from 'react-native-push-notification';
import { createStackNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { connect } from 'react-redux';
import { setDbInstance, setWordCache } from "../redux/Actions";
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
import DatabaseSearcher from '../api/DatabaseSearcher';
import to from '../api/To';
import WordIndexer from '../asyncstorage/WordIndex';
import Constants from '../asyncstorage/Constants';
import { ielts } from '../resources/ielts';
import { logger } from '../api/Debugger';

let getCustomPushNotification = (handleNotification) => {
  PushNotification.configure({
    onNotification: function(notification) {
      handleNotification(notification);
    },
    popInitialNotification: true,
    requestPermissions: true
  });
  return PushNotification;
}

const CustomTransitionConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const { scene } = sceneProps;
      const { route } = scene;
      const params = route.params || {};
      const transition = params.transition || null;
      //console.log(scene);

      if(transition === 'fromLeft') {
        return fromLeft();
      }
      else if(transition === 'fromRight') {
        return getSlideFromRightTransition();
      }
      else {
        return fromLeft();
      }

    }
  };
}

const AppNavigator = createStackNavigator(
  {
    Menu: { screen: Menu },
    Sidebar: { screen: Sidebar },
    MostCommonCard: { screen: MostCommonCard },
    IELTSCard: { screen: IELTSCard },
    TOEFLCard: { screen: TOEFLCard },
    GRECard: { screen: GRECard },
    SATCard: { screen: SATCard }
  },
  {
    initialRouteName: 'Menu',
    headerMode: 'none',
    transitionConfig: CustomTransitionConfig
  }
);

class Setup extends Component {

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
    this.props.setDbInstance()
  }

  openDatabase = async () => {
    let [err, db] = await to(SQLite.openDatabase({name: 'sqlite-31-full-complete.db', createFromLocation : "~/sqlite-31-full-complete.db", location: 'Library'}));
    if(!err) {
      console.log('Database Opened!');
      this.props.setDbInstance(db);
      this.cacheWords(db);
      SplashScreen.hide();
      console.log('===================== splash screen closed ========================');
    }
    else {
      console.log('Try to Open Database, but Fail......');
      console.log(err);
    }
  }

  cacheWords = async (db) => {
    const mostCommonIndex = await WordIndexer.getWordIndex('mostCommon');
    const ieltsIndex = await WordIndexer.getWordIndex('ielts');
    const toeflIndex = await WordIndexer.getWordIndex('toefl');
    const greIndex = await WordIndexer.getWordIndex('gre');
    const satIndex = await WordIndexer.getWordIndex('sat');

    console.log("ieltsIndex = ");
    console.log(Number(ieltsIndex));
    console.log("cahce helf length = " + Constants.wordCacheHalfLength);

    if(ieltsIndex <= Constants.wordCacheHalfLength) {
      for(let i = 0; i < Constants.wordCacheLength; i++) {
        let [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[i], db));
        this.props.setWordCache({
          type: 'ielts',
          operation: 'PUSH',
          content: data
        });
      }
    }
    else if(ieltsIndex + Constants.wordCacheHalfLength >= Constants.ieltsLength) {
      for(let i = Constants.ieltsLength - 1; i >= Constants.ieltsLength - Constants.wordCacheLength; i--) {
        let [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[i], db));
        this.props.setWordCache({
          type: 'ielts',
          operation: 'UNSHIFT',
          content: data
        });
      }
    }
    else {
      for(let i = ieltsIndex - Constants.wordCacheHalfLength; i < ieltsIndex + Constants.wordCacheLength; i++) {
        let [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[i], db));
        this.props.setWordCache({
          type: 'ielts',
          operation: 'PUSH',
          content: data
        });
      }
    }
  }

  async componentDidMount() {

    await this.openDatabase();

    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen

    let customPushNotification = getCustomPushNotification(this.handleNotification);

    customPushNotification.localNotificationSchedule({
      title: 'word',
      message: 'meaning meaning meaning meaning meaning meaning meaning meaning meaning',
      date: new Date(Date.now() + (60 * 1000)), // in 60 secs
      id: '1000',
      userInfo: {
        id: '1000'
      },
      number: 0,
      repeatType: 'minute'
    });
  }

  handleNotification = (notification) => {
    console.log("in handle notification:");
    //console.log(notification);
  }

  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }

}

export default connect(
  null,
  {
    setDbInstance: setDbInstance,
    setWordCache: setWordCache
  }
)(Setup);
