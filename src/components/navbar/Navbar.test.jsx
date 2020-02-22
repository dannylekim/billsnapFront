import React from 'react';
import Navbar from './Navbar.jsx';

describe('LoginPage', () => {
    let wrapper;
    let handleMockFunction;

    beforeEach(() => {
        handleMockFunction = jest.fn();
        wrapper = shallow(<Navbar/>);
    })

    describe('render', () => {
        describe('snapshots 📸', () => {
            it('LoginPage should match snap shot', () => {
                matches(<Navbar/>);
            });
        })
    })
})