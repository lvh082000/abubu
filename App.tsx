import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, Persistor} from 'store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AppNavigation from 'navigation/AppNavgiation';
//@ts-ignore
import AppProviders from './AppProviders';

export default class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 300);
  }
  render() {
    return (
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <SafeAreaProvider>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <AppProviders>
              <AppNavigation />
            </AppProviders>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
