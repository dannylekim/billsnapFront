import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';

// NOTE this test will be updated quite often.

describe('App', () => {
  describe('render', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      const firstNameToolTip = document.createElement('div');
      const lastNameToolTip = document.createElement('div');
      const emailToolTip = document.createElement('div');
      const passwordToolTip = document.createElement('div');
      const verifyPasswordToolTip = document.createElement('div');
      
      firstNameToolTip.setAttribute("id", "firstName");
      document.body.appendChild(firstNameToolTip);

      lastNameToolTip.setAttribute("id", "lastName");
      document.body.appendChild(lastNameToolTip);

      emailToolTip.setAttribute("id", "email");
      document.body.appendChild(emailToolTip);

      passwordToolTip.setAttribute("id", "password");
      document.body.appendChild(passwordToolTip);

      verifyPasswordToolTip.setAttribute("id", "confirmPassword");
      document.body.appendChild(verifyPasswordToolTip);


      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
