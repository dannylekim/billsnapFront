import React from "react";
import PropTypes from "prop-types";
import {
  MdFace,
  MdHelp,
  MdPeople,
  MdReceipt,
  MdSettings,
} from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "shards-react";
import "./styles.scss";

export const DEFAULT_ACTIVE_STATE = {
  dashboard: false,
  profile: false,
  contacts: false,
  settings: false,
  help: false,
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeState: {
        ...DEFAULT_ACTIVE_STATE,
        dashboard: true,
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount(){
    this.state.activeState.dashboard === true && this.props.history.push(`/dashboard`);
  }

  handleClick(link) {
    if (this.state.activeState[link] === false) {
      this.setState({
        activeState: {
          ...DEFAULT_ACTIVE_STATE,
          [link]: true,
        }
      });
      this.props.history.push(`/${link}`);
    }
  }

  handleLogoutClick() {
    localStorage.removeItem("billSnap_token");
    this.props.setUser({});
  }

  render() {
    return (
      <Navbar className="billSnap-SideBar" style={ this.props.hide ? { display: 'none' } : {}}>
        <Nav
          tabs
          vertical={true}
        >
          <NavbarBrand className={"sideLogo"}>Billsnap Logo</NavbarBrand>

          <div className='sidebar__nav-items'>
            <NavItem>
              <NavLink
                id='billSnap-SideBar__bills'
                active={this.state.activeState.dashboard}
                onClick={() => this.handleClick("dashboard")}
              >
                <MdReceipt /> Bills
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id='billSnap-SideBar__profile'
                onClick={() => this.handleClick("profile")}
                active={this.state.activeState.profile}>
                  <MdFace /> Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id='billSnap-SideBar__contacts'
                onClick={() => this.handleClick("contacts")}
                active={this.state.activeState.contacts}>
                  <MdPeople /> Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id='billSnap-SideBar__settings'
                onClick={() => this.handleClick("settings")}
                active={this.state.activeState.settings}>
                  <MdSettings /> Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id='billSnap-SideBar__help'
                onClick={() => this.handleClick("help")}
                active={this.state.activeState.help}>
                  <MdHelp /> Help
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id='billSnap-SideBar__logout'
                onClick={() => this.handleLogoutClick()}
                href={"/"}>
                <FiLogOut /> Log out
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

Sidebar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  hide: PropTypes.bool,
  setUser: PropTypes.func,
};

export default Sidebar;
