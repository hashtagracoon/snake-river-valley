import to from '../api/To';
import { AsyncStorage } from 'react-native';
import { logger } from '../api/Debugger';

module.exports = {

  setWordIndex: async (type, index) => {
    let err = null, data = null;
    index = index.toString();
    switch(type) {
      case 'mostCommon':
        [err, data] = await to(AsyncStorage.setItem('mostCommon', index));
        break;
      case 'ielts':
        [err, data] = await to(AsyncStorage.setItem('ielts', index));
        break;
      case 'toefl':
        [err, data] = await to(AsyncStorage.setItem('toefl', index));
        break;
      case 'gre':
        [err, data] = await to(AsyncStorage.setItem('gre', index));
        break;
      case 'sat':
        [err, data] = await to(AsyncStorage.setItem('sat', index));
        break;
      default:
        break;
    }

    if(err) {
      logger('asyncstorage setitem error:');
      logger(err);
    }
    else {
      logger('asyncstorage setitem success');
      logger('data = ' + index);
    }
  },

  getWordIndex: async (type) => {
    let err = null, data = null;
    switch(type) {
      case 'mostCommon':
        [err, data] = await to(AsyncStorage.getItem('mostCommon'));
        break;
      case 'ielts':
        [err, data] = await to(AsyncStorage.getItem('ielts'));
        break;
      case 'toefl':
        [err, data] = await to(AsyncStorage.getItem('toefl'));
        break;
      case 'gre':
        [err, data] = await to(AsyncStorage.getItem('gre'));
        break;
      case 'sat':
        [err, data] = await to(AsyncStorage.getItem('sat'));
        break;
      default:
        break;
    }

    if(err) {
      logger('asyncstorage getitem error:');
      logger(err);
    }
    else {
      data = (!data) ? 0 : data;
      return parseInt(data);
    }
  }

};
