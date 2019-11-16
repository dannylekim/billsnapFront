import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './index.js';

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
      // matches(<LoginPage />);
      expect(wrapper).toMatchSnapshot()
    });
  });

  describe('functions', () => {
    it('should call handler function when GenericButton is click', () => {
      console.log(wrapper.html());
      wrapper.find('.billsnap__generic-btn').simulate('click');
      jest.spyOn(wrapper.instance().handleButtonClick).mockImplementation(handleMockFunction);
      expect(handleMockFunction).toHaveBeenCalled();
    });
  });
});
