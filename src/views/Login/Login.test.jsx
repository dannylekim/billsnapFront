import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage, { LoginContainer } from './Login.jsx';

describe('LoginPage', () => {
  let wrapper;
  let wrapperLoginContainer;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(<LoginPage />);
    wrapperLoginContainer = shallow(<LoginContainer />);
  })

  afterEach(() => {
    handleMockFunction.mockRestore();
  })

  describe('render', () => {
    it('LoginPage should match snap shot', () => {
      matches(<LoginPage />);
      // expect(wrapper).toMatchSnapshot()
    });
    it('LoginContainer should match  snap shot ', () => {
      matches(<LoginContainer />);
      // expect(wrapperLoginContainer).toMatchSnapshot()
    });
  });

  describe('functions', () => {
    it('should call handler function when GenericButton is click', () => {
      wrapperLoginContainer.find('GenericButton').simulate('click');
      jest.spyOn(wrapperLoginContainer.instance().handleButtonClick).mockImplementation(handleMockFunction);
      expect(handleMockFunction).toHaveBeenCalled();
    });
  });
});
