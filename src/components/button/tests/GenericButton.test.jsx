import React from 'react';
import ReactDOM from 'react-dom';
import { GenericButton } from '../button.jsx';

describe('GenericButton', () => {
  describe('render', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<GenericButton />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
