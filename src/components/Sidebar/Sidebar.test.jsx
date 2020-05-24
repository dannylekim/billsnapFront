import React from 'react';
import Sidebar from './Sidebar.jsx';

describe('Sidebar', () => {
    let wrapper;
    let handleMockFunction;

    beforeEach(() => {
        handleMockFunction = jest.fn();
        wrapper = shallow(<Sidebar/>);
    })

    describe('render', () => {
        describe('snapshots 📸', () => {
            it('Sidebar should match snap shot', () => {
                matches(<Sidebar/>);
            });
        })
    })
})