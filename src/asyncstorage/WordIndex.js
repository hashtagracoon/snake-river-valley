import to from '../api/To';
import { AsyncStorage } from 'react-native';

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
      console.log('asyncstorage setitem error:');
      console.log(err);
    }
    else {
      console.log('asyncstorage setitem success');
      console.log('data = ' + index);
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
      console.log('asyncstorage getitem error:');
      console.log(err);
    }
    else {
      data = (!data) ? 0 : data;
      return parseInt(data);
    }
  },

  setNotiWordIndex: async (type, index) => {
    let err = null, data = null;
    index = index.toString();
    switch(type) {
      case 'mostCommon':
        [err, data] = await to(AsyncStorage.setItem('mostCommon_noti', index));
        break;
      case 'ielts':
        [err, data] = await to(AsyncStorage.setItem('ielts_noti', index));
        break;
      case 'toefl':
        [err, data] = await to(AsyncStorage.setItem('toefl_noti', index));
        break;
      case 'gre':
        [err, data] = await to(AsyncStorage.setItem('gre_noti', index));
        break;
      case 'sat':
        [err, data] = await to(AsyncStorage.setItem('sat_noti', index));
        break;
      default:
        break;
    }

    if(err) {
      console.log('asyncstorage setitem error:');
      console.log(err);
    }
    else {
      console.log('asyncstorage setitem success');
      console.log('data = ' + index);
    }
  },

  getNotiWordIndex: async (type) => {
    let err = null, data = null;
    switch(type) {
      case 'mostCommon':
        [err, data] = await to(AsyncStorage.getItem('mostCommon_noti'));
        break;
      case 'ielts':
        [err, data] = await to(AsyncStorage.getItem('ielts_noti'));
        break;
      case 'toefl':
        [err, data] = await to(AsyncStorage.getItem('toefl_noti'));
        break;
      case 'gre':
        [err, data] = await to(AsyncStorage.getItem('gre_noti'));
        break;
      case 'sat':
        [err, data] = await to(AsyncStorage.getItem('sat_noti'));
        break;
      default:
        break;
    }

    if(err) {
      console.log('asyncstorage getitem error:');
      console.log(err);
    }
    else {
      data = (!data) ? 0 : data;
      return parseInt(data);
    }
  }
};
