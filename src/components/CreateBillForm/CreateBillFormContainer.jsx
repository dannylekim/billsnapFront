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
        tipPercent: 0,
        taxes: []
      },
      balance: 0,
      isOpen: false,
      hasErrors: {},
      errorMessage: "",
      isLoading: false,
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.handleErrorResponse = this.handleErrorResponse.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
  };

  /**
   *
   *
   * @param event
   * @param isAdd
   */
  onFormAdd = (event) => {
    const { name, value } = event.target;
  };

  /**
   *
   * @param event
   */
  onFormRemove = (event) => {
    const { name, value } = event.target;
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
              onChange={this.onFormChange}
              hasErrors={this.state.hasErrors}
              errorMessage={this.errorMessage}
              addBillForm={this.state.addBillForm}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateBillFormContainer;
