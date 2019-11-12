import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './Login.jsx';

describe('LoginPage', () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(<LoginPage />);
  })

  afterEach(() => {
    handleMockFunction.mockRestore();
  })

  describe('render', () => {
    it('should match snap shot', () => {
      matches(<LoginPage />);
    });
  });

  describe('functions', () => {
    it('should call handler function when GenericButton is click', () => {
      console.log(wrapper.instance());
      wrapper.find('button.billsnap__generic-btn').simulate('click');
      jest.spyOn(wrapper.instance().handleButtonClick).mockImplementation(handleMockFunction);
      expect(handleMockFunction).toHaveBeenCalled();
    });
  });
});
