import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// NOTE this test will be updated quite often.

describe('App', () => {
  describe('render', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
