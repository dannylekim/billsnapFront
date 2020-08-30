import React, {Component} from "react";
import {MdOpenInNew} from "react-icons/md";

import "./styles.scss";
import ItemSplit from "../ItemSplit";
import {Button, Modal} from "shards-react";

class ItemSplitContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.props.setActiveItemId(this.props.selectedItemId);
    this.setState((prev) => ({
      ...prev,
      isOpen: !this.state.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { itemInformation } = this.props;

    return (
      <div className="popout__button">
        <MdOpenInNew onClick={this.toggleModal} size={15} />
        <Modal
          open={isOpen}
          toggle={this.toggleModal}
          className="scroll__bar__modal"
        >
          {itemInformation && <ItemSplit itemInformation={itemInformation} />}
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
