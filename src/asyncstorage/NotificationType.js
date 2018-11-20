import to from '../api/To';
import { AsyncStorage } from 'react-native';

module.exports = {

  setType: async (type) => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.setItem('notificationType', type));

    if(err) {
      console.log('asyncstorage set notification type error:');
      console.log(err);
    }
    else {
      console.log('asyncstorage set notification type success');
      console.log('data = ' + type);
    }
  },

  getType: async () => {
    let err = null, data = null;
    [err, data] = await to(AsyncStorage.getItem('notificationType'));

    if(err) {
      console.log('asyncstorage get notification type error:');
      console.log(err);
    }
    else {
      data = (!data) ? 'ielts' : data;
      console.log('asyncstorage get notification type success: ' + data);
      return data;
    }
  }

};
