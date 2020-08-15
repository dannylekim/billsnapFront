import React from "react";
import "./styles.scss";

import {Button, Col, Container, Form, FormGroup, FormInput, Row, FormRadio, InputGroup, InputGroupAddon, InputGroupText} from "shards-react";

export const CreateBillForm = ({
  handleSubmitClick,
  handleAddClick,
  handleRemoveClick,
  onFormChange,
  onCategoryChange,
  hasErrors,
  errorMessage,
  addBillForm,
  balance = 0,
  tipFormat
}) => {
  return (
    <div>
      <Form>
        <FormGroup onChange={onFormChange}>
          <label htmlFor="#name"> BILL NAME </label>
          <FormInput name="name" id="#name" placeholder="ex: Bill #1"/>
          <Container>
            <Row>
              <Col>
                <label htmlFor="#paidBy"> PAID BY </label>
                <FormInput name="paidBy" id="#paidBy" placeholder="ex: Danny"/>
              </Col>
              <Col>
                <label htmlFor="#category"> CATEGORY </label>
                <FormInput name="category" id="#category" placeholder="ex: Restaurant"/>
              </Col>
            </Row>
          </Container>
          <label htmlFor="#company"> COMPANY </label>
          <FormInput name="company" id="#company" placeholder="ex: OnlyFans"/>
        </FormGroup>

        <FormGroup onChange={(event) => onCategoryChange(event, "item")}>
          <Container>
            <Row>
              <Col>Items</Col>
              <Col>Price</Col>
              <Col />
            </Row>
            {addBillForm.items.map((item, key) => (
              <div>
                <Row key={key}>
                  <Col> {item.name}</Col>
                  <Col> {item.cost}</Col>
                  <Col> 
                    <div onClick={() => handleRemoveClick("item", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
            <Form id="itemInputs">
              <Row>
                <Col>
                  <FormInput name="name" placeholder="ex: Goat cheese"/>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon type="prepend">
                      <InputGroupText>$</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="cost" type="number" min="0" placeholder="ex: 37.43" />
                  </InputGroup>
                </Col>
                <Button onClick={() => handleAddClick("item")}>Add</Button>
              </Row>
            </Form>
          </Container>
        </FormGroup>
        
        <FormGroup onChange={(event) => onCategoryChange(event, "tax")}>
          <Container>
            <Row>
              <Col>Tax Name</Col>
              <Col>Percentage</Col>
              <Col />
            </Row>
            {addBillForm.taxes.map((tax, key) => (
              <div>
                <Row key={key}>
                  <Col> {tax.name}</Col>
                  <Col> {tax.percentage}</Col>
                  <Col> 
                    <div onClick={() => handleRemoveClick("tax", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
            <Form id="taxInputs">
              <Row>
                <Col>
                  <FormInput name="name" placeholder="ex: TPS"/>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon type="prepend">
                      <InputGroupText>%</InputGroupText>
                    </InputGroupAddon>
                    <FormInput name="percentage" type="number" min="0" placeholder="ex: 5" />
                  </InputGroup>
                </Col>
                <Button onClick={() => handleAddClick("tax")}>Add</Button>
              </Row>
            </Form>
          </Container>
        </FormGroup>

        <FormGroup onChange={onFormChange}>
          <label htmlFor="#tip"> TIP </label>
          <FormRadio 
            inline 
            checked={tipFormat} 
            onChange={(event) => onCategoryChange(event, "tipFormat")} >Amount</FormRadio>
          <FormRadio 
            inline 
            checked={!tipFormat}
            onChange={(event) => onCategoryChange(event, "tipFormat")} >Percentage</FormRadio>
          
          <Form id="tipInputs">
            {tipFormat ? (
              <InputGroup>
                <InputGroupAddon type="prepend">
                  <InputGroupText> $</InputGroupText>
                </InputGroupAddon>
                <FormInput name="tipAmount" type="number" min="0" placeholder="ex: 3.69" />
              </InputGroup>
            ) : (
              <InputGroup>
                <InputGroupAddon type="prepend">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
                <FormInput name="tipPercent" type="number" min="0" placeholder="ex: 25" />
              </InputGroup>
            )}
          </Form>
        </FormGroup>

        <div>Total amount to split: {balance}</div>
        
        <FormGroup onChange={(event) => onCategoryChange(event, "account")}>
          <Container>
            <Row>
              <Col>Invite Users</Col>
              <Col />
            </Row>
            {addBillForm.accountsList.map((email, key) => (
              <div>
                <Row key={key}>
                  <Col> {email}</Col>
                  <Col> 
                    <div onClick={() => handleRemoveClick("account", key)}> - </div>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
            <Form id="accountInputs">
              <Row>
                <Col>
                  <FormInput name="email" placeholder="friend@email.com"/>
                </Col>
                <Button onClick={() => handleAddClick("account")}>Add</Button>
              </Row>
            </Form>
          </Container>
        </FormGroup>
      </Form>
      <Button size="md" pill onClick={handleSubmitClick} name="confirm">
        Confirm a
      </Button>
    </div>
  );
};
