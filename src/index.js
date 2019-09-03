import "./styles/index.css";
import "react-toastify/dist/ReactToastify.min.css";
import "chart.js";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { ToastContainer } from "react-toastify";
import reducers from "./redux/reducers";

import registerServiceWorker from "./registerServiceWorker";

import ErrorBoundary from "./components/ErrorBoundary";
import App from "./components/App";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
      <ToastContainer />
    </ErrorBoundary>
  </Provider>,
  document.querySelector("#root")
);

registerServiceWorker();
