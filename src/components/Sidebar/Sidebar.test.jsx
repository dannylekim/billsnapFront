import React from 'react';
import Sidebar, {DEFAULT_ACTIVE_STATE} from './Sidebar.jsx';
import SidebarComponent from '../Sidebar';
import {NavLink} from "shards-react";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  
});

describe('Sidebar', () => {
    let wrapper;
    let handleMockFunction, mockSetUser;

    beforeEach(() => {
        handleMockFunction = jest.fn();
        mockSetUser = jest.fn();
        wrapper = shallow(<Sidebar setUser={mockSetUser}/>);
    })

    describe('render', () => {
        describe('snapshots 📸', () => {
            it('Sidebar should match snap shot', () => {
                matches(<Sidebar setUser={mockSetUser}/>);
            });

            it('SidebarComponent should match snap shot', () => {
                matches(<Provider store={store}> <SidebarComponent setUser={mockSetUser}/></Provider>);
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
            it('Navlink should call all click handles on click', () => {
                const mockHandleClick = jest.fn();
                const mockHandleLogoutClick = jest.fn();
               
                wrapper.instance().handleClick = mockHandleClick;
                wrapper.instance().handleLogoutClick = mockHandleLogoutClick;
                wrapper.find(NavLink).filter('#billSnap-SideBar__bills').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__profile').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__contacts').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__settings').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__help').simulate('click');
                wrapper.find(NavLink).filter('#billSnap-SideBar__logout').simulate('click');
                expect(mockHandleClick).toHaveBeenCalledTimes(5);
                expect(mockHandleLogoutClick).toHaveBeenCalledTimes(1);
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
        describe('handleLogoutClick', () => {
            it('should clear local storage', () => {
                const EXPECTED_LENGTH = 0;
                wrapper.setProps({
                    setUser: mockSetUser
                });
                wrapper.instance().handleLogoutClick();
                const ACTUAL_LENGTH = localStorage.length;
                expect(ACTUAL_LENGTH).toEqual(EXPECTED_LENGTH);
            });
        });
    })

})