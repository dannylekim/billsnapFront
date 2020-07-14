import React from 'react';
import Sidebar, {DEFAULT_ACTIVE_STATE} from './Sidebar.jsx';
import {NavLink} from "shards-react";

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
            it('Sidebar should match snap shot', () => {
                const EXPECTED_STATE = {
                    ...DEFAULT_ACTIVE_STATE,
                    contacts: true
                };
                wrapper.setState({
                    activeState: {...EXPECTED_STATE}
                });
                matches(wrapper);
            });
        })
        describe('interactions', () => {
            it('Navlink should call handleClick on click', () => {
                const mockFunction = jest.fn();
                wrapper.instance().handleClick = mockFunction;
                wrapper.find(NavLink).filter('#billSnap-SideBar__bills').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__profile').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__contacts').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__settings').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__help').simulate('click');
                expect(mockFunction).toHaveBeenCalledTimes(5);
            });
        })
    })

    describe('function', () => {
        describe('handleClick', () => {
            it('should not change state if parameter does not exist in this state', () => {
                const EXPECTED_STATE = {
                    ...DEFAULT_ACTIVE_STATE,
                    contacts: true
                };
                wrapper.setState({
                    activeState: {...EXPECTED_STATE}
                })
                wrapper.instance().handleClick('starlord');
                expect(wrapper.state('activeState')).toEqual(EXPECTED_STATE)
            });
            it('should change state if parameter does exist in this state', () => {
                const DEFAULT_STATE = {
                    ...DEFAULT_ACTIVE_STATE,
                    contacts: true
                }
                const EXPECTED_STATE = {
                    ...DEFAULT_ACTIVE_STATE,
                    bills: true
                }
                wrapper.setState({
                    activeState: {...DEFAULT_STATE}
                })
                wrapper.instance().handleClick('bills');
                expect(wrapper.state('activeState')).toEqual(EXPECTED_STATE)
            });
        })
    })

})