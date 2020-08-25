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
      {alertMessage.visible ? (
        <Alert
          className="mb-3"
          // dismissible={dismissAlert}
          open={alertMessage.visible}
          theme={alertMessage.alertType}
        >
          {errorMessage}
        </Alert>
      ) : (
        <div className="hidden__div" />
      )}

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
              <Col>
                <label htmlFor="#paidBy"> PAID BY </label>
                <FormInput name="paidBy" id="paidBy" placeholder="ex: Danny"/>
              </Col>
              <Col>
                <label htmlFor="#category"> CATEGORY </label>
                <FormInput name="category" id="category" placeholder="ex: Restaurant"/>
              </Col>
            </Row>
          </Container>
          <label htmlFor="#company"> COMPANY </label>
          <FormInput name="company" id="company" placeholder="ex: OnlyFans"/>
        </FormGroup>

        <FormGroup id="items">
          <Container>
            <Row>
              <Col>Items</Col>
              <Col>Price</Col>
              <Col />
            </Row>
            {addBillForm.items.map((item, key) => (
              <div key={key}>
                <Row>
                  <Col> {item.name}</Col>
                  <Col> {item.cost}</Col>
                  <Col> 
                    <div onClick={() => handleRemoveClick("item", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
              <Row>
                <Col>
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
                <Button onClick={() => handleAddClick("item")}>Add</Button>
              </Row>
          </Container>
        </FormGroup>
        
        <FormGroup id="taxes">
          <Container>
            <Row>
              <Col>Tax Name</Col>
              <Col>Percentage</Col>
              <Col />
            </Row>
            {addBillForm.taxes.map((tax, key) => (
              <div key={key}>
                <Row>
                  <Col> {tax.name}</Col>
                  <Col> {tax.percentage}</Col>
                  <Col> 
                    <div onClick={() => handleRemoveClick("tax", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
              <Row>
                <Col>
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
                <Button onClick={() => handleAddClick("tax")}>Add</Button>
              </Row>
          </Container>
        </FormGroup>

        <FormGroup>
          <label htmlFor="#tip"> TIP </label>
          <FormRadio 
            inline 
            checked={tipFormat} 
            onChange={(event) => onFormChange(event, "tipFormat")} >Amount</FormRadio>
          <FormRadio 
            inline 
            checked={!tipFormat}
            onChange={(event) => onFormChange(event, "tipFormat")} >Percentage</FormRadio>
          
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

        <div>Total amount to split: {totalBalance}</div>
        
        <FormGroup >
          <Container>
            <Row>
              <Col>Invite Users</Col>
              <Col />
            </Row>
            {addBillForm.accountsList.map((email, key) => (
              <div key={key}>
                <Row>
                  <Col> {email}</Col>
                  <Col> 
                    <div onClick={() => handleRemoveClick("account", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
              <Row>
                <Col>
                  <FormInput
                    onChange={(event) => onFormChange(event, "account")}
                    id="account"
                    name="email"
                    value={accountBuffer}
                    placeholder="friend@email.com"/>
                </Col>
                <Button onClick={() => handleAddClick("account")}>Add</Button>
              </Row>
          </Container>
        </FormGroup>
      </Form>
      <Button size="md" pill onClick={handleSubmitClick} name="confirm">
        Confirm a
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
