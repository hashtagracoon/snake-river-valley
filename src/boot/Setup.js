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
import { setDbInstance } from "../redux/Actions";
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

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

  componentDidMount() {

    SQLite.openDatabase({name: 'sqlite-31-full-complete.db', createFromLocation : "~/sqlite-31-full-complete.db", location: 'Library'})
      .then((db) => {
        console.log('Database Opened!');
        this.props.setDbInstance(db);
        console.log('before transaction');
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM 'words' limit 32`, [], (tx, results) => {
              console.log("Query completed");

              // Get rows with Web SQL Database spec compliance.

              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Record: ${row.lemma}`);
                //this.setState({record: row});
              }
            });
        });
        console.log('after transaction');
      })
      .catch((err) => {
        console.log('Try to Open Database, but Fail......');
      });

    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();

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
    setDbInstance: setDbInstance
  }
)(Setup);