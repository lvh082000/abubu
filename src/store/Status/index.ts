import {
  AnyAction,
  AsyncThunk,
  createAction,
  createSlice,
} from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

type StatusState = {[key: string]: 'pending' | 'rejected' | 'fulfilled'};

const initialState: StatusState = {};

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

const resetAction = createAction('reset-tracked-loading-state');

const getTypeNonAction = (type: string) => {
  return type.substring(0, type.lastIndexOf('/'));
};

const StatusSlice = createSlice({
  name: 'STATUS_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(resetAction, () => initialState);
    builder.addMatcher(isPendingAction, (state, action) => {
      const actionType = getTypeNonAction(action.type);
      state[actionType] = 'pending';
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      const actionType = getTypeNonAction(action.type);
      state[actionType] = 'rejected';
    });
    builder.addMatcher(isFulfilledAction, (state, action) => {
      const actionType = getTypeNonAction(action.type);
      state[actionType] = 'fulfilled';
    });
  },
});

export default StatusSlice.reducer;

export * from './Selectors';
