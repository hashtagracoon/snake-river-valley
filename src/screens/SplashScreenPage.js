import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { setDbInstance } from "../redux/Actions";
import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
import to from '../api/To';
import { logger } from '../api/Debugger';

class SplashScreenPage extends Component {

  openDatabase = async () => {
    let [err, db] = await to(SQLite.openDatabase({name: 'wordlist.db', createFromLocation : "~/wordlist.db", location: 'Library'}));
    if(!err) {
      logger('Database Opened!');
      this.props.setDbInstance(db);
      logger('setDbInstance ok!');
    }
    else {
      logger('Try to Open Database, but Fail......');
      logger(err);
    }
  }

  async componentDidMount() {

    await this.openDatabase();
    logger('before exec navigation to menu');
    this.props.navigation.navigate('Menu');
    logger('after exec navigation to menu');
  }

  render() {
    return (
      <View />
    );
  }

}

export default connect(
  null,
  {
    setDbInstance: setDbInstance
  }
)(SplashScreenPage);
