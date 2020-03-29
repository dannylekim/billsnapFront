import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import {createRegisterFormElements} from "../../../constants/FormElements";
// NOTE this test will be updated quite often.

describe('App', () => {
  describe('render', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      createRegisterFormElements();
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
