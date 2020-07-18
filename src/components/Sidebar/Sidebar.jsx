import React from 'react';
import UserReducer from '../../redux/reducers/userReducers';
import {MdFace, MdHelp, MdPeople, MdReceipt, MdSettings} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'shards-react';
import './styles.scss';

export const DEFAULT_ACTIVE_STATE = {
    bills: false,
    profile: false,
    contacts: false,
    settings: false,
    help: false,
}

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeState: {
                ...DEFAULT_ACTIVE_STATE,
                bills: true
            }
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleClick(link) {
        if (typeof this.state.activeState[link] == "boolean") {
            this.setState({
                activeState: {
                    ...DEFAULT_ACTIVE_STATE,
                    [link]: true
                }
            })
        }
    }

    handleLogoutClick() {
        localStorage.clear();
        UserReducer({}, 'SET_STATE');
    }

    render() {

        return (
            <Navbar>
                <Nav tabs className={"billSnap-SideBar"} vertical={true}>
                    <NavbarBrand className={"sideLogo"}>
                        Billsnap Logo
                    </NavbarBrand>

                    <div className="sidebar__navitems">
                        <NavItem>
                            <NavLink id='billSnap-SideBar__bills' onClick={() => this.handleClick("bills")}
                                     active={this.state.activeState.bills}>
                                <MdReceipt/> Bills
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink id='billSnap-SideBar__profile' onClick={() => this.handleClick("profile")}
                                     active={this.state.activeState.profile}>
                                <MdFace/> Profile
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink id='billSnap-SideBar__contacts' onClick={() => this.handleClick("contacts")}
                                     active={this.state.activeState.contacts}>
                                <MdPeople/> Contacts
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink id='billSnap-SideBar__settings' onClick={() => this.handleClick("settings")}
                                     active={this.state.activeState.settings}>
                                <MdSettings/> Settings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink id='billSnap-SideBar__help' onClick={() => this.handleClick("help")}
                                     active={this.state.activeState.help}>
                                <MdHelp/> Help
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink id='billSnap-SideBar__logout' onClick={() => this.handleLogoutClick()} href={"/"}>
                                <FiLogOut/> Log out
                            </NavLink>
                        </NavItem>
                    </div>
                </Nav>
            </Navbar>
        )
    }
}

export default Sidebar
