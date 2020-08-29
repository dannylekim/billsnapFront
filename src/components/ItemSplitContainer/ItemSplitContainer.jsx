import React, {Component} from "react";
import {MdOpenInNew} from "react-icons/md";

import "./styles.scss";
import ItemSplit from "../ItemSplit";
import {Button, Modal} from "shards-react";

function getSelectedItem(info, selectedItemId) {
  return info.items.find((item) => item.itemId === selectedItemId);
}

class ItemSplitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      itemInformation: {},
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const { selectedItemId, bill } = this.props;
    const selectedItem = bill.items.find((item) => item.id === selectedItemId);

    const itemInformation = {
      name: selectedItem.name,
      cost: selectedItem.cost,
      accounts: [],
    };

    bill.informationPerAccount
      .filter((info) => {
        return getSelectedItem(info, selectedItemId);
      })
      .forEach((involvedInformationPerAccount) => {
        itemInformation.accounts.push({
          status: involvedInformationPerAccount.invitationStatus,
          firstName: involvedInformationPerAccount.account.firstName,
          percentage: getSelectedItem(
            involvedInformationPerAccount,
            selectedItemId
          ).percentage,
        });
      });

    this.setState((prev) => ({
      ...prev,
      itemInformation: itemInformation,
    }));
  }

  toggleModal() {
    this.setState((prev) => ({
      ...prev,
      isOpen: !this.state.isOpen,
    }));
  }

  render() {
    const { isOpen, itemInformation } = this.state;

    return (
      <div className="popout__button">
        <MdOpenInNew onClick={this.toggleModal} size={15} />
        <Modal
          open={isOpen}
          toggle={this.toggleModal}
          className="scroll__bar__modal"
        >
          <ItemSplit itemInformation={itemInformation} />
          <div className="send__right">
            <Button
              pill
              size="sm"
              theme="success"
              className="confirm__button"
              onClick={this.toggleModal}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ItemSplitContainer;
