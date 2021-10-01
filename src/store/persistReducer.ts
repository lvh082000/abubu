import {persistReducer} from 'redux-persist';
import RootReducers from './reducers';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authentication', 'me'],
};

const PersistReducer = persistReducer(config, RootReducers);
export default PersistReducer;
