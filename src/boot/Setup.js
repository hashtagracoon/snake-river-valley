import React, { Component } from 'react';
import { Root } from 'native-base';
import SplashScreenPage from '../screens/SplashScreenPage';
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
    SplashScreenPage: { screen: SplashScreenPage },
    Menu: { screen: Menu },
    Sidebar: { screen: Sidebar },
    MostCommonCard: { screen: MostCommonCard },
    IELTSCard: { screen: IELTSCard },
    TOEFLCard: { screen: TOEFLCard },
    GRECard: { screen: GRECard },
    SATCard: { screen: SATCard }
  },
  {
    initialRouteName: 'SplashScreenPage',
    headerMode: 'none',
    transitionConfig: CustomTransitionConfig
  }
);

export default class Setup extends Component {

  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }

}
