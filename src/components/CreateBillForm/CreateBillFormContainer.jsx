import React, {Component} from "react";
import {CreateBillForm} from "./CreateBillForm";
import {Button, Modal, ModalBody, ModalHeader} from "shards-react";

class CreateBillFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBillForm: {
        name: "",
        category: "",
        company: "",
        items: [],
        accountsList: [],
        tipAmount: 0,
        tipPercent: 0,
        taxes: []
      },
      balance: 0,
      isOpen: false,
      hasErrors: {},
      errorMessage: "",
      isLoading: false,
      itemBuffer: {name: "", cost: 0},
      taxBuffer: {name: "", percentage: 0},
      accountBuffer: "",
      tipFormat: true
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCorrectTipFormat = this.handleCorrectTipFormat.bind(this);
  }

  /**
   * @function onFormChange for non calculating item
   * @description event handling function, handles the changes in the input fields.
   * @param {Event} event
   */
  onFormChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      addBillForm: {
        ...prev.addBillForm,
        [name]: value,
      },
    }));
  }

  /**
   *
   *
   * @param event
   * @param isAdd
   */
  onCategoryChange = (event, category) => {
    const { name, value } = event.target;
    switch (category) {
      case "item":
        this.setState((prev) => ({
          itemBuffer: {
            ...prev.itemBuffer,
            [name]: value
          }
        }));
        break;

      case "tax":
        this.setState((prev) => ({
          taxBuffer: {
            ...prev.taxBuffer,
            [name]: value
          }
        }));
        break;

      case "tipFormat":
        this.setState({
          tipFormat: !this.state.tipFormat,
        });
        break;

      case "account":
        this.setState(() => ({
          accountBuffer: value
        }));
        break;
    }
  };

  /**
   * @function handleCorrectTipFormat
   */
  handleCorrectTipFormat = () => {
    if (this.state.tipFormat) {
      this.setState((prev) => ({
        addBillForm: {
          ...prev.addBillForm,
          tipPercent: undefined,
        },
      }));
    } else  {
      this.setState((prev) => ({
        addBillForm: {
          ...prev.addBillForm,
          tipAmount: undefined,
        },
      }));
    }
  };

  /**
   * @function handleSubmitClick
   * @description Handles the submission by calling the create bill endpoint.
   * handle the response with handleResponse function.
   * @param {Event} event
   */
  handleSubmitClick = async (event) => {
    event.preventDefault();
    try {
      this.setState({
        isLoading: true,
      });

      this.handleCorrectTipFormat();
      
      console.log(this.state.addBillForm);
      const newBill = await this.props.createNewBill(this.state.addBillForm);
      this.setState({
        isOpen: true,
      });
      return newBill;
    } catch (error) {
      this.handleErrorResponse(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  /**
   * @function handleItemAddClick
   */
  handleAddClick = (category) => {
    switch (category) {
      case "item":
        const itemBuffer = this.state.itemBuffer;
        if (itemBuffer.name && itemBuffer.cost) {
          this.setState({
            items: this.state.addBillForm.items.push({ ...itemBuffer }),
            balance: this.state.balance + itemBuffer.cost,
            itemBuffer: { name: "", cost: 0 }
          });
        }
        break;

      case "tax":
        const taxBuffer = this.state.taxBuffer;
        if (taxBuffer.name && taxBuffer.percentage) {
          this.setState({
            taxes: this.state.addBillForm.taxes.push({ ...taxBuffer }),
            taxBuffer: {name: "", percentage: 0}
          });
        }
        break;

      case "account":
        let accBuffer = this.state.accountBuffer;
        if (accBuffer) {
          this.setState({
            accountsList: this.state.addBillForm.accountsList.push(accBuffer),
            accountBuffer: ""
          })
        }
        break;
    }
  }

    /**
   * @function handleItemRemoveClick
   */
  handleRemoveClick = (category, index) => {
    switch (category) {
      case "item":
        const items = this.state.addBillForm.items;
        delete items[index];
        this.setState({ items: items });
        break;

      case "tax":
        const taxes = this.state.addBillForm.taxes;
        delete taxes[index];
        this.setState({ taxes: taxes });
        break;

      case "account":
        const accounts = this.state.addBillForm.accountsList;
        delete accounts[index];
        this.setState({ accountsList: accounts });
        break;
    }
  }

  /**
   * Toggles the modal from open to close
   */
  toggleModal = () => {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
    }));
  };

  handleErrorResponse = (response) => {
    console.log("wew")
    console.log(response.errors)
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal}> + Add Bill</Button>
        <Modal size="lg" open={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader>Bill details</ModalHeader>
          <ModalBody>
            <CreateBillForm
              handleSubmitClick={this.handleSubmitClick}
              handleAddClick={this.handleAddClick}
              handleRemoveClick={this.handleRemoveClick}
              onFormChange={this.onFormChange}
              onCategoryChange={this.onCategoryChange}
              hasErrors={this.state.hasErrors}
              errorMessage={this.errorMessage}
              addBillForm={this.state.addBillForm}
              balance={this.state.balance}
              tipFormat={this.state.tipFormat}
              itemBuffer={this.state.itemBuffer}
              taxBuffer={this.state.taxBuffer}
              accountBuffer={this.state.accountBuffer}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateBillFormContainer;
