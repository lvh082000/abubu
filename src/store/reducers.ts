import {combineReducers} from 'redux';
import Auth from './Authentication';
import Me from './Me';
import Product from './Product';
import Order from './Order';
import Status from './Status';
import CashBook from './CashBook';

const RootReducers = combineReducers({
  status: Status,
  authentication: Auth,
  me: Me,
  product: Product,
  order: Order,
  cashbook: CashBook,
});

export default RootReducers;
