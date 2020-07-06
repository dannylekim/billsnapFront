import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  application: {}
});

import {createRegisterFormElements} from "../../../constants/FormElements";
// NOTE this test will be updated quite often.

describe('App', () => {
  describe('render', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      createRegisterFormElements();
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
      div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
