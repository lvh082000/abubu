/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
//@ts-ignore
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  "Can't perform a React state update on an unmounted component",
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
  'ImmutableStateInvariantMiddleware took ',
  'Sending',
]);

AppRegistry.registerComponent(appName, () => App);
