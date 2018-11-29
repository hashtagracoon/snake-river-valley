import PushNotification from 'react-native-push-notification';
import Constants from '../asyncstorage/Constants';
import Notification from '../asyncstorage/Notification';
import { mostCommon } from '../resources/mostCommon';
import { ielts } from '../resources/ielts';
import { toefl } from '../resources/toefl';
import { gre } from '../resources/gre';
import { sat } from '../resources/sat';
import DatabaseSearcher from '../api/DatabaseSearcher';
import to from '../api/To';
import { StackActions, NavigationActions } from 'react-navigation';
import { logger } from '../api/Debugger';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export default class CustomNotification {

  constructor(navigation, dbInstance, notificationStartDate) {
    this.navigation = navigation;
    this.dbInstance = dbInstance;
    this.notificationStartDate = notificationStartDate;

    this.index = 0;
  }

  notificationHandler = async (notification) => {
    logger("In notification handler:");
    this.cancelNotification();
    const preIndex = this.index;

    const nowDate = new Date(Date.now());
    if(this.notificationStartDate) {
      while(this.notificationStartDate < nowDate) {
        this.notificationStartDate = addDays(this.notificationStartDate, 1);
      }
      Notification.setStartDate(this.notificationStartDate);
    }

    this.createNotification();

    let routeName = 'IELTSCard';
    let notificationType = await Notification.getType();
    switch(notificationType) {
      case 'mostCommon':
        routeName = 'MostCommonCard';
        break;
      case 'ielts':
        routeName = 'IELTSCard';
        break;
      case 'toefl':
        routeName = 'TOEFLCard';
        break;
      case 'gre':
        routeName = 'GRECard';
        break;
      case 'sat':
        routeName = 'SATCard';
        break;
      default:
        break;
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({
        routeName: routeName,
        params: { index: preIndex }
      }) ],
      key: null
    });

    this.navigation.dispatch(resetAction);
  };

  getCustomPushNotification = (notificationHandler) => {
    PushNotification.configure({
      onNotification: function(notification) {
        notificationHandler(notification);
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    return PushNotification;
  };

  cancelNotification = () => {
    logger('*** CANCEL notification ***');
    PushNotification.cancelLocalNotifications({id: '1000'});
  };

  initNotification = () => {
    logger('*** INIT notification ***');

    this.getCustomPushNotification(this.notificationHandler);
  };

  createNotification = async () => {

    logger('*** CREATE notification ***');

    let customPushNotification = this.getCustomPushNotification(this.notificationHandler);

    let notificationType = await Notification.getType();

    switch(notificationType) {
      case 'mostCommon':
        this.index = getRandomInt(Constants.mostCommonLength - 1);
        break;
      case 'ielts':
        this.index = getRandomInt(Constants.ieltsLength - 1);
        break;
      case 'toefl':
        this.index = getRandomInt(Constants.toeflLength - 1);
        break;
      case 'gre':
        this.index = getRandomInt(Constants.greLength - 1);
        break;
      case 'sat':
        this.index = getRandomInt(Constants.satLength - 1);
        break;
      default:
        break;
    }

    let title = '', message = '';
    let err = null, data = null;
    switch(notificationType) {
      case 'mostCommon':
        [err, data] = await to(DatabaseSearcher.searchDatabase(mostCommon[this.index], this.dbInstance));
        break;
      case 'ielts':
        [err, data] = await to(DatabaseSearcher.searchDatabase(ielts[this.index], this.dbInstance));
        break;
      case 'toefl':
        [err, data] = await to(DatabaseSearcher.searchDatabase(toefl[this.index], this.dbInstance));
        break;
      case 'gre':
        [err, data] = await to(DatabaseSearcher.searchDatabase(gre[this.index], this.dbInstance));
        break;
      case 'sat':
        [err, data] = await to(DatabaseSearcher.searchDatabase(sat[this.index], this.dbInstance));
        break;
      default:
        break;
    }
    if(err) logger(err);
    title = data[0].title;
    message = data[0].meanings[0].meaning;

    logger(this.notificationStartDate);
    logger(new Date(Date.now()));

    customPushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: this.notificationStartDate,//new Date(Date.now() + (10 * 1000)), // in 10 secs
      id: '1000',
      userInfo: {
        id: '1000'
      },
      number: 0,
      repeatType: 'day'
    });
  };

}
