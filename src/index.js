import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { serverReducer } from "./redux";
import { configureStore } from "@reduxjs/toolkit";
import Reciever from './reciever';

export const store = configureStore({
  reducer: {
    serverReducer,
  },
  devTools: true,
});

store.subscribe(() => {
  const state = store.getState();
  if (!state.currentServerReducer || !state.currentServerReducer.id) return
  console.log("currentServerReducer", state.currentServerReducer);
  window.api.updateStore(state.currentServerReducer);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    
    <App />
  </Provider>
);