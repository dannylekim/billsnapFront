import React from "react";
import "./styles.scss";

import {
  Button,
  Col, 
  Container, 
  Form, 
  FormGroup, 
  FormInput, 
  Row, 
  FormRadio, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText,
  Alert,
  Tooltip} from "shards-react";

export const CreateBillForm = ({
  handleSubmitClick,
  handleAddClick,
  handleRemoveClick,
  onFormChange,
  hasErrors,
  errorMessage,
  alertMessage,
  addBillForm,
  totalBalance = 0,
  tipFormat,
  itemBuffer,
  taxBuffer,
  accountBuffer,
  inputList
}) => {
  return (
    <div>
      <Alert
        open={alertMessage.visible}
        theme={alertMessage.alertType}>
        {errorMessage}
      </Alert>

      <Form>
        <FormGroup onChange={(event) => onFormChange(event, "details")}>
          <label htmlFor="#name"> BILL NAME </label>
          <FormInput 
            name="name" 
            id="name" 
            placeholder="ex: Bill #1"
            invalid={hasErrors["name"].hasError}/>
          <Container>
            <Row>
              <Col className="display__left" lg="5">
                <label htmlFor="#paidBy"> PAID BY </label>
                <FormInput name="paidBy" id="paidBy" placeholder="ex: Danny"/>
              </Col>
              <Col lg="5">
                <label htmlFor="#category"> CATEGORY </label>
                <FormInput name="category" id="category" placeholder="ex: Restaurant"/>
              </Col>
              <Col lg="1"/>
            </Row>
          </Container>
          <label htmlFor="#company"> COMPANY </label>
          <FormInput name="company" id="company" placeholder="ex: OnlyFans"/>
        </FormGroup>

        <FormGroup id="items">
          <Container>
            <Row>
              <Col className="display__left"><label><strong>Items</strong></label></Col>
              <Col><label>PRICE</label></Col>
              <Col />
            </Row>
            {addBillForm.items.map((item, key) => (
              <div key={key}>
                <Row className="element__display">
                  <Col className="display__left"> {item.name}</Col>
                  <Col> {item.cost}</Col>
                  <Col> 
                    <div className="remove__button" onClick={() => handleRemoveClick("item", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
              <Row>
                <Col className="display__left">
                  <FormInput 
                    onChange={(event) => onFormChange(event, "item")}
                    name="name"
                    value={itemBuffer.name}
                    placeholder="ex: Goat cheese"/>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon type="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <FormInput 
                      onChange={(event) => onFormChange(event, "item")} 
                      name="cost" 
                      type="number" 
                      min="0" 
                      value={itemBuffer.cost} 
                      placeholder="ex: 37.43" />
                  </InputGroup>
                </Col>
                <Col>
                  <Button onClick={() => handleAddClick("item")}>Add</Button>
                </Col>
              </Row>
          </Container>
        </FormGroup>

        <FormGroup>
          <Container>
            <Row>
              <Col lg="4">
                <label htmlFor="#tip"> <strong>TIP</strong></label>
              </Col>
              <Col lg="5">
                <FormRadio 
                  inline 
                  checked={tipFormat} 
                  onChange={(event) => onFormChange(event, "tipFormat")} >Amount</FormRadio>
                <FormRadio 
                  inline 
                  checked={!tipFormat}
                  onChange={(event) => onFormChange(event, "tipFormat")} >Percentage</FormRadio>
              </Col>
            </Row>
          </Container>
          
            {tipFormat ? (
              <InputGroup>
                <InputGroupAddon type="prepend">
                  <InputGroupText> $</InputGroupText>
                </InputGroupAddon>
                <FormInput 
                  onChange={(event) => onFormChange(event, "details")}
                  id="tip"
                  name="tipAmount"
                  value={addBillForm.tipAmount}
                  type="number" 
                  min="0" 
                  placeholder="ex: 3.69" />
              </InputGroup>
            ) : (
              <InputGroup>
                <InputGroupAddon type="prepend">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
                <FormInput 
                  onChange={(event) => onFormChange(event, "details")}
                  id="tip"
                  name="tipPercent"
                  value={addBillForm.tipPercent}
                  type="number" 
                  min="0"
                  max="100"
                  placeholder="ex: 25" />
              </InputGroup>
            )}
        </FormGroup>
        
        <FormGroup id="taxes">
          <Container>
            <Row>
              <Col className="display__left"><label><strong>Tax Name</strong></label></Col>
              <Col><label>PERCENTAGE</label></Col>
              <Col />
            </Row>
            {addBillForm.taxes.map((tax, key) => (
              <div key={key}>
                <Row className="element__display">
                  <Col className="display__left"> {tax.name}</Col>
                  <Col> {tax.percentage}</Col>
                  <Col> 
                    <div className="remove__button" onClick={() => handleRemoveClick("tax", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
              <Row>
                <Col className="display__left">
                  <FormInput 
                    onChange={(event) => onFormChange(event, "tax")}
                    name="name"
                    value={taxBuffer.name}
                    placeholder="ex: TPS"/>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon type="prepend">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                    <FormInput 
                      onChange={(event) => onFormChange(event, "tax")}
                      name="percentage" 
                      value={taxBuffer.percentage}
                      type="number" 
                      min="0" 
                      max="100"
                      placeholder="ex: 5" />
                  </InputGroup>
                </Col>
                <Col>
                  <Button onClick={() => handleAddClick("tax")}>Add</Button>
                </Col>
              </Row>
          </Container>
        </FormGroup>

        <Container className="balance">
          <Row>
            <Col lg="4"><strong>Total amount to split:</strong></Col>
            <Col lg="8">
              <span id="balance__amount">{totalBalance} $</span>
            </Col>
          </Row>
        </Container>
        
        <FormGroup >
          <Container>
            <Row>
              <Col lg="4"><strong>Invite Users</strong></Col>
              <Col lg="8"/>
            </Row>
            {addBillForm.accountsList.map((email, key) => (
              <div key={key}>
                <Row className="element__display">
                  <Col className="display__left"> {email}</Col>
                  <Col> 
                    <div className="remove__button" onClick={() => handleRemoveClick("account", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
              <Row>
                <Col lg="8" className="display__left">
                  <FormInput
                    onChange={(event) => onFormChange(event, "account")}
                    id="account"
                    name="email"
                    value={accountBuffer}
                    placeholder="friend@email.com"/>
                </Col>
                <Col lg="4">
                  <Button onClick={() => handleAddClick("account")}>Add</Button>
                </Col>
              </Row>
          </Container>
        </FormGroup>
      </Form>
      <Button size="md" pill onClick={handleSubmitClick} name="confirm">
        Confirm
      </Button>

      {inputList.map((field, key) => (
        <Tooltip
          key={key}
          placement="top"
          open={hasErrors[field].hasError}
          target={`#${field}`}>
          <span id="input_error"> {hasErrors[field].message} </span>
        </Tooltip>
      ))}

    </div>
  );
};
