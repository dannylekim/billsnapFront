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
  })

  describe('render', () => {
    describe('snapshots 📸', () => {
      it('LoginPage should match snap shot', () => {
        matches(<LoginPage />);
      });
    })

    describe('components', () => {
      // some reason enzyme seems to broken in v3
      test.skip('LoginPage should contain LoginContainer component', () => {
        expect(wrapper.find('LoginContainer')).to.have.lengthOf(1);
      })
    });
  });
});

describe('LoginContainer', () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(<LoginContainer handleButtonClickx={handleMockFunction} />);
  })

  afterEach(() => {
    handleMockFunction.mockRestore();
  })

  describe('render', () => {
    describe('snapshots 📸', () => {
      it('LoginContainer should match  snap shot ', () => {
        matches(<LoginContainer />);
      });
    })

    describe('components', () => {
      test.skip('LoginContainer should contain GenericButton component', () => {
        expect(wrapper.find('GenericButton')).to.have.lengthOf(1);
      })
    });
  });

  describe('functions', () => {
    it.skip('should call handler function when GenericButton is click', () => {
      wrapper.find('GenericButton').simulate('click');
      expect(handleMockFunction).toHaveBeenCalled();
    });
  });
});
