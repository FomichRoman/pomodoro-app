import { Context, createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer, RootState } from "./redusers";

const makeStore  = (context: Context) => createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});