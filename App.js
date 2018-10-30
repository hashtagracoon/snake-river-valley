import React, { Component } from 'react';
import Setup from './src/boot/Setup';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

export default class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <Setup />
      </Provider>
    );
  }

}
