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
import { createStackNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { connect } from 'react-redux';
import { setDbInstance } from "../redux/Actions";
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
import DatabaseSearcher from '../api/DatabaseSearcher';
import to from '../api/To';
import { logger } from '../api/Debugger';

const CustomTransitionConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const { scene } = sceneProps;
      const { route } = scene;
      const params = route.params || {};
      const transition = params.transition || null;

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

  openDatabase = async () => {
    let [err, db] = await to(SQLite.openDatabase({name: 'sqlite-31-full-complete.db', createFromLocation : "~/sqlite-31-full-complete.db", location: 'Library'}));
    if(!err) {
      console.log('Database Opened!');
      this.props.setDbInstance(db);
      SplashScreen.hide();
      console.log('===================== splash screen closed ========================');
    }
    else {
      console.log('Try to Open Database, but Fail......');
      console.log(err);
    }
  }

  async componentDidMount() {

    await this.openDatabase();

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
