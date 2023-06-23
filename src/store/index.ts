import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as toDo from "./ToDo";
import * as calendar from "./Calendar";

export interface ApplicationState {
  toDo: toDo.State;
  calendar: calendar.State;
}

const reducer = combineReducers({
  toDo: toDo.reducer as any,
  calendar: calendar.reducer as any,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export interface ThunkDispatch<TBasicAction, TExtraThunkArg> {
  <A extends TBasicAction>(action: A): A;
  <TReturnType>(
    thunkAction: AppThunkAction<TBasicAction, TReturnType, TExtraThunkArg>
  ): TReturnType;
  // This overload is the union of the two above (see TS issue #14107).
  <TAction extends TBasicAction, TReturnType>(
    action: TAction | AppThunkAction<TBasicAction, TReturnType, TExtraThunkArg>
  ): TAction | TReturnType;
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<
  TAction,
  TReturnType = void,
  TExtraThunkArg = never
> {
  (
    dispatch: ThunkDispatch<TAction, TExtraThunkArg>,
    getState: () => ApplicationState,
    extraArguments?: TExtraThunkArg
  ): TReturnType;
}

export type AsMapObject<K> = { [U in keyof K]: K[U] };
