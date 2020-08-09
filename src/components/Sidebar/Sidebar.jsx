import React from "react";
import {MdFace, MdHelp, MdPeople, MdReceipt, MdSettings,} from "react-icons/md";
import {FiLogOut} from "react-icons/fi";
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "shards-react";
import BillDisplay from "../../views/BillDisplay";
import "./styles.scss";

export const DEFAULT_ACTIVE_STATE = {
  bills: false,
  profile: false,
  contacts: false,
  settings: false,
  help: false,
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
   
    this.handleClick = this.handleClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  filterComponentFromNav = (navType) => {
    const filterKeyVal = {
      "bills" : <BillDisplay/>,
      "profile" : <div> Profile </div>,
      "contacts": <div> Contacts </div>,
      "settings": <div> Settings </div>,
      "help": <div> Help </div>
    };
    this.props.setComponent(filterKeyVal[navType]);
  }


  handleClick(link) {
    if (typeof this.props.activeState[link] == "boolean") {
      this.props.setActiveState({
            ...DEFAULT_ACTIVE_STATE,
            [link]: true,
          });
      this.filterComponentFromNav(link);
    }
  }

  handleLogoutClick() {
    localStorage.removeItem("billSnap_token");
    this.props.setUser({});
  }

  render() {
    return (
      <Navbar>
        <Nav tabs className={"billSnap-SideBar"} vertical={true}>
          <NavbarBrand className={"sideLogo"}>Billsnap Logo</NavbarBrand>

          <div className="sidebar__navitems">
            <NavItem>
              <NavLink
                id="billSnap-SideBar__bills"
                onClick={() => this.handleClick("bills")}
                active={this.props.activeState.bills}
              >
                <MdReceipt /> Bills
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="billSnap-SideBar__profile"
                onClick={() => this.handleClick("profile")}
                active={this.props.activeState.profile}
              >
                <MdFace /> Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="billSnap-SideBar__contacts"
                onClick={() => this.handleClick("contacts")}
                active={this.props.activeState.contacts}
              >
                <MdPeople /> Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="billSnap-SideBar__settings"
                onClick={() => this.handleClick("settings")}
                active={this.props.activeState.settings}
              >
                <MdSettings /> Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="billSnap-SideBar__help"
                onClick={() => this.handleClick("help")}
                active={this.props.activeState.help}
              >
                <MdHelp /> Help
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="billSnap-SideBar__logout"
                onClick={() => this.handleLogoutClick()}
                href={"/"}
              >
                <FiLogOut /> Log out
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </Navbar>
    );
  }
}

export default Sidebar;
