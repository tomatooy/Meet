import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state/auth.js";
import messageReducer from "./state/message.js";
import notificationReducer from "./state/notification.js";
import uiReducer from "./state/ui.js"
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";




const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  notification:notificationReducer,
  ui:uiReducer
  // Add other slice reducers here
});

const persistConfig = { key: "root", storage, version:1,blacklist:["ui"]};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  //</React.StrictMode>
);
