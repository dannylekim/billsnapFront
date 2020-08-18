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
      totalBalance: 0,
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
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleCorrectTipFormat = this.handleCorrectTipFormat.bind(this);
    this.calculateTax = this.calculateTax.bind(this);
  }

  /**
   * @function onFormChange for non calculating item
   * @description event handling function, handles the changes in the input fields.
   * @param event
   * @param category
   */
  onFormChange = (event, category) => {
    let { name, value } = event.target;

    value = (
      name === "cost" ||
      name === "percentage" ||
      name === "tipAmount" ||
      name === "tipPercent") ? Number(value) : value;

    switch (category) {
      case "details":
        this.setState((prev) => ({
          addBillForm: {
            ...prev.addBillForm,
            [name]: value,
          },
        }), () => this.calculateTax());
        break;

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
        }, () => this.calculateTax());
        break;

      case "account":
        this.setState(() => ({
          accountBuffer: value
        }));
        break;
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

      await this.handleCorrectTipFormat();
      
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
          }, () => this.calculateTax());
        }
        break;

      case "tax":
        const taxBuffer = this.state.taxBuffer;
        if (taxBuffer.name && taxBuffer.percentage) {
          this.setState({
            taxes: this.state.addBillForm.taxes.push({ ...taxBuffer }),
            taxBuffer: {name: "", percentage: 0}
          }, () => this.calculateTax());
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
        const newBalance = this.state.balance - items[index].cost;
        delete items[index];
        this.setState({ 
          items: items,
          balance: newBalance, 
        }, () => this.calculateTax());
        break;

      case "tax":
        const taxes = this.state.addBillForm.taxes;
        delete taxes[index];
        this.setState({ taxes: taxes }, () => this.calculateTax());
        break;

      case "account":
        const accounts = this.state.addBillForm.accountsList;
        delete accounts[index];
        this.setState({ accountsList: accounts });
        break;
    }
  }

    /**
   * @function handleCorrectTipFormat
   */
  handleCorrectTipFormat = async () => {
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
   *  @function calculateTax
   */
  calculateTax = () => {
    let tmpBalance = this.state.balance;
    this.state.addBillForm.taxes.forEach((tax) => {
      tmpBalance += this.state.balance * (tax.percentage / 100);
    });

    if (this.state.tipFormat) {
      tmpBalance += this.state.addBillForm.tipAmount;
    } else {
      tmpBalance += tmpBalance * (this.state.addBillForm.tipPercent / 100);
    }

    this.setState({
      totalBalance: tmpBalance,
    });
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
    console.log(response)
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
              hasErrors={this.state.hasErrors}
              errorMessage={this.errorMessage}
              addBillForm={this.state.addBillForm}
              totalBalance={this.state.totalBalance}
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
