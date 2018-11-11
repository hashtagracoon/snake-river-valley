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

  setPreWordIndex: async (type, index) => {
    let err = null, data = null;
    index = index.toString();
    switch(type) {
      case 'mostCommon':
        [err, data] = await to(AsyncStorage.setItem('mostCommon_pre', index));
        break;
      case 'ielts':
        [err, data] = await to(AsyncStorage.setItem('ielts_pre', index));
        break;
      case 'toefl':
        [err, data] = await to(AsyncStorage.setItem('toefl_pre', index));
        break;
      case 'gre':
        [err, data] = await to(AsyncStorage.setItem('gre_pre', index));
        break;
      case 'sat':
        [err, data] = await to(AsyncStorage.setItem('sat_pre', index));
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

  getPreWordIndex: async (type) => {
    let err = null, data = null;
    switch(type) {
      case 'mostCommon':
        [err, data] = await to(AsyncStorage.getItem('mostCommon_pre'));
        break;
      case 'ielts':
        [err, data] = await to(AsyncStorage.getItem('ielts_pre'));
        break;
      case 'toefl':
        [err, data] = await to(AsyncStorage.getItem('toefl_pre'));
        break;
      case 'gre':
        [err, data] = await to(AsyncStorage.getItem('gre_pre'));
        break;
      case 'sat':
        [err, data] = await to(AsyncStorage.getItem('sat_pre'));
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
