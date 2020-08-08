import React from "react";
import "./styles.scss";

import {Button, Col, Container, Form, FormGroup, FormInput, Row,} from "shards-react";

export const CreateBillForm = ({
  handleSubmitClick,
  onChange,
  hasErrors,
  errorMessage,
  addBillForm,
  balance = 0,
}) => {
  return (
    <div>
      <Form>
        <FormGroup onChange={onChange}>
          <label htmlFor="#name"> NAME </label>
          <FormInput name="name" id="#name" />
          <label htmlFor="#category"> CATEGORY </label>
          <FormInput name="category" id="#category" />
          <label htmlFor="#company"> COMPANY </label>
          <FormInput name="company" id="#company" />
        </FormGroup>

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
                <Col> - </Col>
              </Row>
              <hr />
            </div>
          ))}
          <Row>
            <Col>
              <FormInput name="name" />
            </Col>
            <Col>
              <FormInput name="cost" type="number" />
            </Col>
            <Col>+</Col>
          </Row>
        </Container>

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
                <Col> - </Col>
              </Row>
              <hr />
            </div>
          ))}
          <Row>
            <Col>
              <FormInput name="name" />
            </Col>
            <Col>
              <FormInput name="percentage" type="number" />
            </Col>
            <Col>+</Col>
          </Row>
        </Container>

        <FormGroup>
          <label htmlFor="#tip"> TIP </label>
          {addBillForm.tipAmount ? (
            <FormInput name="tipAmount" type="number" />
          ) : (
            <FormInput name="tipPercent" type="number" />
          )}
        </FormGroup>

        <div>Total amount to split: {balance}</div>

        <Container>
          <Row>
            <Col>Invite Users</Col>
            <Col />
          </Row>
          {addBillForm.accountsList.map((email, key) => (
            <div>
              <Row key={key}>
                <Col> {email}</Col>
                <Col> - </Col>
              </Row>
              <hr />
            </div>
          ))}
          <Row>
            <Col>
              <FormInput name="email" />
            </Col>
            <Col>+</Col>
          </Row>
        </Container>
      </Form>
      <Button size="md" pill onClick={handleSubmitClick} name="confirm">
        Confirm a
      </Button>
    </div>
  );
};
