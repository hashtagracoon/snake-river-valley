import to from '../api/To';
import { AsyncStorage } from 'react-native';
import { logger } from '../api/Debugger';

module.exports = {

  setEnable: async (enable) => {
    enable = (enable) ? 'true' : 'false';
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.setItem('notificationEnable', enable));

    if(err) {
      logger('asyncstorage set notification enable error:');
      logger(err);
    }
    else {
      logger('asyncstorage set notification enable success');
      logger('data = ' + data);
    }
  },

  getEnable: async () => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.getItem('notificationEnable'));

    if(err) {
      logger('asyncstorage get notification enable error:');
      logger(err);
    }
    else {
      data = (data === 'true') ? true : false;
      logger('asyncstorage get notification enable success');
      logger('data = ' + data);
      return data;
    }
  },

  setIndex: async (index) => {
    index = index.toString();
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.setItem('notificationIndex', index));

    if(err) {
      logger('asyncstorage set notification index error:');
      logger(err);
    }
    else {
      logger('asyncstorage set notification index success');
      logger('data = ' + data);
    }
  },

  getIndex: async () => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.getItem('notificationIndex'));

    if(err) {
      logger('asyncstorage get notification index error:');
      logger(err);
    }
    else {
      data = parseInt(data);
      logger('asyncstorage get notification index success');
      logger('data = ' + data);
      return data;
    }
  },

  setStartDate: async (date) => {
    date = date.toString();
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.setItem('notificationStartDate', date));

    if(err) {
      logger('asyncstorage set notification start date error:');
      logger(err);
    }
    else {
      logger('asyncstorage set notification start time success');
      logger('data = ' + data);
    }
  },

  getStartDate: async () => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.getItem('notificationStartDate'));

    if(err) {
      logger('asyncstorage get notification start data error:');
      logger(err);
    }
    else {
      data = (!data) ? null : new Date(data);
      logger('asyncstorage get notification start date success');
      logger('data = ' + data);
      return data;
    }
  },

  setType: async (type) => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.setItem('notificationType', type));

    if(err) {
      logger('asyncstorage set notification type error:');
      logger(err);
    }
    else {
      logger('asyncstorage set notification type success');
      logger('data = ' + type);
    }
  },

  getType: async () => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.getItem('notificationType'));

    if(err) {
      logger('asyncstorage get notification type error:');
      logger(err);
    }
    else {
      data = (!data) ? 'ielts' : data;
      logger('asyncstorage get notification type success');
      logger('data = ' + data);
      return data;
    }
  }

};
