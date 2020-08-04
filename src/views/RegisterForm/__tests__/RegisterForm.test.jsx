import React from "react";
import RegisterFormContainer, {DEFAULT_ERRORS, RegisterForm,} from "../RegisterForm.jsx";
import {createRegisterFormElements} from "../../../constants/FormElements";
import {shallow} from "enzyme";
import {login, register} from "../../../utils/requests/UserRequests";

jest.mock("../../../utils/requests/UserRequests");

describe("RegisterForm", () => {
  let wrapper;
  let handleMockFunction;
  let mockToggleFormType;
  let mockValidateField;
  let mockDismissAlert;
  let mockOnChange;
  let mockCheckValidity;
  let mockTriggerAlert;
  let mockSetUser;

  const conditions = [
    {
      name: "confirmPassword",
      condition: false,
      toolTipInfo: {
        open: false,
        errorMessage: "",
      },
    },
    {
      name: "password",
      condition: false,
      toolTipInfo: {
        open: false,
        errorMessage: "",
      },
    },
    {
      name: "firstName",
      condition: false,
      toolTipInfo: {
        open: false,
        errorMessage: "",
      },
    },
    {
      name: "lastName",
      condition: false,
      toolTipInfo: {
        open: false,
        errorMessage: "",
      },
    },
    {
      name: "email",
      condition: false,
      toolTipInfo: {
        open: false,
        errorMessage: "",
      },
    },
  ];

  beforeEach(() => {
    handleMockFunction = jest.fn();
    mockToggleFormType = jest.fn();
    mockValidateField = jest.fn();
    mockDismissAlert = jest.fn();
    mockOnChange = jest.fn();
    mockCheckValidity = jest.fn();
    mockTriggerAlert = jest.fn();
    mockSetUser = jest.fn();

    wrapper = shallow(
      <RegisterFormContainer
        setFormType={mockToggleFormType}
        setUser={mockSetUser}
      />
    );
  });

  afterEach(() => {
    handleMockFunction.mockRestore();
    mockToggleFormType.mockRestore();
    mockOnChange.mockRestore();
    mockCheckValidity.mockRestore();
    mockTriggerAlert.mockRestore();
    register.mockRestore();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Register should match snap shot", () => {
        createRegisterFormElements();

        matches(
          <RegisterForm
            dismissAlert={mockDismissAlert}
            onChange={mockOnChange}
            setFormType={mockToggleFormType}
            handleButtonClick={handleMockFunction}
            validInvalidByName={handleMockFunction}
            conditions={conditions}
            alertNotification={DEFAULT_ERRORS}
          />
        );
      });

      it("RegisterFormContainer should match snap shot", () => {
        matches(
          <RegisterFormContainer
            setFormType={mockToggleFormType}
            setUser={mockSetUser}
          />
        );
      });

      it("RegisterForm should match snap shot when loading", () => {
        wrapper.setState({ isLoading: true });

        matches(
          <RegisterForm
            dismissAlert={mockDismissAlert}
            onChange={mockOnChange}
            setFormType={mockToggleFormType}
            handleButtonClick={handleMockFunction}
            validInvalidByName={handleMockFunction}
            conditions={conditions}
            alertNotification={DEFAULT_ERRORS}
          />
        );
      });
    });

  });

  describe("functions", () => {
    describe("validInvalidByName", () => {
      describe("invalid state", () => {
        const type = "invalid";
        it("should return appropriate boolean value", () => {
          const result = wrapper
            .instance()
            .validInvalidByName("firstName", type);
          expect(result).toBe(false);

          wrapper.setState({
            validFields: {
              firstName: true,
            },
            userCredentials: {
              firstName: "nice",
            },
          });

          const result1 = wrapper
            .instance()
            .validInvalidByName("firstName", type);
          expect(result1).toBe(false);
        });
      });

      describe("valid state", () => {
        const type = "valid";
        it("should return appropriate boolean value", () => {
          const result = wrapper
            .instance()
            .validInvalidByName("firstName", type);
          expect(result).toBe(false);

          wrapper.setState({
            validFields: {
              firstName: true,
            },
            userCredentials: {
              firstName: "nice",
            },
          });

          const result1 = wrapper
            .instance()
            .validInvalidByName("firstName", type);
          expect(result1).toBe(true);
        });
      });
    });

    describe("triggerAlert", () => {
      it("return danger object on error", () => {
        const testMessage = "nice 💩";
        const EXPECTED_RESULT = {
          isOpen: true,
          alertType: "danger",
          alertMessage: testMessage,
        };

        wrapper.instance().triggerAlert("error", testMessage);

        expect(wrapper.state().alertNotification).toMatchObject(
          EXPECTED_RESULT
        );
      });
      it("return danger object on anything else", () => {
        const testMessage = "nice 💩";
        const EXPECTED_RESULT = {
          isOpen: true,
          alertType: "success",
          alertMessage: testMessage,
        };
        wrapper.instance().triggerAlert("nice", testMessage);

        expect(wrapper.state().alertNotification).toMatchObject(
          EXPECTED_RESULT
        );
      });
    });

    test("dismissAlert should reset alertNotification state", () => {
      wrapper.setState({
        alertNotification: {
          isOpen: true,
          alertType: "error",
          alertMessage: "🚨ALERT BIG ERROR 🚨",
        },
      });

      wrapper.instance().dismissAlert();

      expect(wrapper.state().alertNotification).toMatchObject(DEFAULT_ERRORS);
    });

    describe("validateField", () => {
      describe("names", () => {
        it("should pass regex", () => {
          wrapper.instance().validateField("firstName", 1231321);
          expect(wrapper.state().validFields.firstName).toBe(false);

          wrapper.instance().validateField("lastName", "jimbo");
          expect(wrapper.state().validFields.lastName).toBe(true);
        });
      });

      describe("email", () => {
        it("should pass regex", () => {
          wrapper.instance().validateField("email", "asdasa1231321");
          expect(wrapper.state().validFields.email).toBe(false);

          wrapper.instance().validateField("email", "123@123.com");
          expect(wrapper.state().validFields.email).toBe(true);
        });
      });

      describe("password", () => {
        it("should pass password regex", () => {
          wrapper.instance().validateField("password", "as21");
          expect(wrapper.state().validFields.passwordFormat).toBe(false);

          wrapper.instance().validateField("password", "123@123.com");
          expect(wrapper.state().validFields.passwordFormat).toBe(false);

          wrapper.instance().validateField("password", "123@123.Com");
          wrapper.instance().validateField("blahblah", "");
          expect(wrapper.state().validFields.passwordFormat).toBe(true);
        });

        it("should password matching", () => {
          const mockFn = jest.fn();
          expect(
            RegisterFormContainer.validatePassword("hi", "hi")
          ).toBeTruthy();
          expect(
            RegisterFormContainer.validatePassword("hi", "bye")
          ).toBeFalsy();
          RegisterFormContainer.validatePassword = mockFn;

          mockFn.mockImplementation(() => true);
          const TEMP_PW = "123@123.Com";
          wrapper.setState({
            userCredentials: {
              password: TEMP_PW,
            },
          });
          wrapper.instance().validateField("confirmPassword", TEMP_PW);
          expect(wrapper.state().validFields.password).toBe(true);
          expect(mockFn).toBeCalledTimes(1);
          expect(wrapper.state().userCredentials.confirmPassword).toBe(true);
        });
      });
    });

    it("onFormChange should modify user state", () => {
      const mockEvent = {
        target: {
          name: "firstName",
          value: "Jon",
        },
      };
      wrapper.instance().validateField = mockValidateField;
      wrapper.instance().dismissAlert = mockDismissAlert;

      wrapper.instance().onFormChange(mockEvent);

      expect(mockValidateField).toHaveBeenCalledWith("firstName", "Jon");
      expect(mockDismissAlert).toBeCalledTimes(1);
      expect(wrapper.state().userCredentials).toMatchObject({
        firstName: "Jon",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    });

    it("checkValidity should return correct boolean values based on params", () => {
      const FAKE_NAME = "JON PEW PEW";
      const PASSWORD = "J@NP3Wp3W";

      wrapper.setState({
        validFields: {
          firstName: true,
          password: false,
        },
        userCredentials: {
          firstName: FAKE_NAME,
          password: PASSWORD,
        },
      });

      const result = wrapper
        .instance()
        .checkValidity(wrapper.state().validFields.firstName, "firstName");
      expect(result).toBe(true);

      const result1 = wrapper
        .instance()
        .checkValidity(wrapper.state().validFields.password, "password");
      expect(result1).toBe(false);

      expect(result1).toBe(false);
    });

    describe("handleSubmitClick", () => {
      let mockEvent;
      let mockSetState;
      beforeEach(() => {
        mockSetState = jest.fn();

        mockEvent = {
          preventDefault: jest.fn(),
        };
        wrapper.instance().checkValidity = mockCheckValidity;
        wrapper.instance().setState = mockSetState;
      });

      afterEach(() => {
        mockSetState.mockRestore();
      });

      it("should call appropridate functions on success 201 request + login passing", async () => {
        const SUCCESS_RESPONSE = {
          statusCode: 201,
        };
        const SUCCESS_LOGIN = {
          token: "billsnaptest",
          profile: { id: 1, firtName: "Bob" },
        };
        const TEMP_DATA = {
          firstName: "chad",
          lastName: "alpha",
          email: "alpha@chad.chad",
          password: "alpha🕶️chad💪chad",
        };

        const LOGIN_TEMP_DATA = {
          email: TEMP_DATA.email,
          password: TEMP_DATA.password,
        };
        const mockPushFunction = jest.fn();

        wrapper.setState({
          userCredentials: TEMP_DATA,
        });

        wrapper.setProps({
          history: {
            push: mockPushFunction,
          },
        });

        mockCheckValidity.mockReturnValue(true);
        register.mockResolvedValue(SUCCESS_RESPONSE);
        login.mockResolvedValue(SUCCESS_LOGIN);

        await wrapper.instance().handleSubmitClick(mockEvent);

        expect(mockCheckValidity).toBeCalledTimes(5);
        expect(register).toHaveBeenCalledWith(TEMP_DATA);
        expect(login).toHaveBeenCalledWith(LOGIN_TEMP_DATA);
        expect(mockSetState).toBeCalledTimes(2);
      });

      it("should call appropridate functions on success 201 request + login failing", async () => {
        const SUCCESS_RESPONSE = {
          statusCode: 201,
        };
        const BAD_LOGIN = {};
        const TEMP_DATA = {
          firstName: "chad",
          lastName: "alpha",
          email: "alpha@chad.chad",
          password: "alpha🕶️chad💪chad",
        };

        const LOGIN_TEMP_DATA = {
          email: TEMP_DATA.email,
          password: TEMP_DATA.password,
        };
        const mockPushFunction = jest.fn();

        wrapper.setState({
          userCredentials: TEMP_DATA,
        });

        wrapper.setProps({
          history: {
            push: mockPushFunction,
          },
        });
        wrapper.instance().triggerAlert = mockTriggerAlert;

        mockCheckValidity.mockReturnValue(true);
        register.mockResolvedValue(SUCCESS_RESPONSE);
        login.mockResolvedValue(BAD_LOGIN);

        await wrapper.instance().handleSubmitClick(mockEvent);

        expect(mockPushFunction).toBeCalledTimes(0);
        expect(register).toHaveBeenCalledWith(TEMP_DATA);
        expect(login).toHaveBeenCalledWith(LOGIN_TEMP_DATA);
        expect(mockTriggerAlert).toHaveBeenCalledWith(
          "error",
          "Account created, but failed to log in. Please try logging in with your credentials"
        );
      });

      it("should trigger triggerAlert on success anything but 201 request", async () => {
        const SUCCESS_RESPONSE = {
          statusCode: 200,
          message: "uhoh buddy",
        };
        wrapper.instance().triggerAlert = mockTriggerAlert;

        mockCheckValidity.mockReturnValue(true);
        register.mockResolvedValue(SUCCESS_RESPONSE);

        await wrapper.instance().handleSubmitClick(mockEvent);

        expect(mockTriggerAlert).toHaveBeenCalledWith(
          "error",
          SUCCESS_RESPONSE.message
        );
      });

      it("should trigger triggerAlert on failed request", async () => {
        const ERROR_RESPONSE = "uhoh buddy 💁‍♂️";
        wrapper.instance().triggerAlert = mockTriggerAlert;

        mockCheckValidity.mockReturnValue(true);
        register.mockRejectedValue(new Error(ERROR_RESPONSE));

        await wrapper.instance().handleSubmitClick(mockEvent);

        expect(mockTriggerAlert).toHaveBeenCalledWith("error", ERROR_RESPONSE);
      });

      it("should validate fields if checkValidity fails", async () => {
        wrapper.instance().triggerAlert = mockTriggerAlert;

        mockCheckValidity.mockReturnValue(false);
        wrapper.instance().validateField = mockValidateField;

        await wrapper.instance().handleSubmitClick(mockEvent);

        expect(mockValidateField).toBeCalledTimes(5);
        expect(mockValidateField).toHaveBeenCalledWith("firstName", -1);
        expect(mockValidateField).toHaveBeenCalledWith("lastName", -1);
        expect(mockValidateField).toHaveBeenCalledWith("email", -1);
        expect(mockValidateField).toHaveBeenCalledWith("password", -1);
        expect(mockTriggerAlert).toHaveBeenCalledWith(
          "error",
          "Form Not Validated"
        );
      });
    });

    it.skip("click formToggle", () => {
      wrapper.find(".form__toggle").simulate("click");
      expect(mockToggleFormType).toBeCalledTimes(1);
    });
  });
});
