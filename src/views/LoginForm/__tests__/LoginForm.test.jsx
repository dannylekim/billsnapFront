import React from "react";
import LoginFormContainer, {
  LoginForm,
  DEFAULT_ERRORS,
  DEFAULT_ALERT_MESSAGE,
} from "../LoginForm.jsx";
import { shallow, mount } from "enzyme";
import { login } from "../../../utils/requests/UserRequests";
jest.mock("../../../utils/requests/UserRequests");

describe("LoginForm", () => {
  let wrapper;
  let handleMockFunction,
    mockOnChange,
    mockDismissAlert,
    mockHandleResponse,
    mockHandleSubmitClick,
    mockToggleFormType,
    mockloginRequest;
  let setState, useStateSpy;

  beforeEach(() => {
    setState = jest.fn();
    useStateSpy = jest
      .spyOn(React, "useState")
      .mockImplementation((init) => [init, setState]);
    mockToggleFormType = jest.fn();
    handleMockFunction = jest.fn();
    mockDismissAlert = jest.fn();
    mockOnChange = jest.fn();
    mockHandleResponse = jest.fn();
    mockloginRequest = jest.fn();
    mockHandleSubmitClick = jest
      .fn()
      .mockImplementation(() => mockHandleResponse);


    wrapper = shallow(<LoginFormContainer setFormType={mockToggleFormType} />);
  });

  afterEach(() => {
    handleMockFunction.mockRestore();
    mockToggleFormType.mockRestore();
    mockDismissAlert.mockRestore();
    mockOnChange.mockRestore();
    mockHandleResponse.mockRestore();
    mockHandleSubmitClick.mockRestore();
    login.mockRestore();
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("LoginFormWrapper should match snap shot", () => {
        const emailToolTip = document.createElement("div");
        const passwordToolTip = document.createElement("div");

        emailToolTip.setAttribute("id", "email");
        document.body.appendChild(emailToolTip);
        passwordToolTip.setAttribute("id", "password");
        document.body.appendChild(passwordToolTip);

        matches(
          <LoginForm
            onChange={mockOnChange}
            handleButtonClick={handleMockFunction}
            hasErrors={DEFAULT_ERRORS}
            alertMessage={DEFAULT_ALERT_MESSAGE}
            error_message=""
            dismissAlert={handleMockFunction}
          />
        );
      });

      it("LoginForm should match snap shot", () => {
        matches(<LoginFormContainer setFormType={mockToggleFormType} />);
      });
    });

    describe("components", () => {
      describe("ToolTip closed", () => {
        it("Should have no Errors ToolTip if closed", () => {
          wrapper = shallow(
            <LoginForm
              onChange={mockOnChange}
              setFormType={mockToggleFormType}
              handleButtonClick={mockHandleSubmitClick}
              hasErrors={DEFAULT_ERRORS}
              alertMessage={DEFAULT_ALERT_MESSAGE}
              error_message=""
              dismissAlert={mockDismissAlert}
            />
          );

          expect(wrapper.find("Alert")).toHaveLength(0);
          expect(wrapper.find("FormInput")).toHaveLength(2);
          expect(wrapper.find("FormInput").at(0).prop("invalid")).toBeFalsy();
          expect(wrapper.find("FormInput").at(1).prop("invalid")).toBeFalsy();

          expect(wrapper.find("Tooltip")).toHaveLength(2);
          expect(wrapper.find("Tooltip").at(0).prop("open")).toBeFalsy();
          expect(wrapper.find("Tooltip").at(1).prop("open")).toBeFalsy();
        });
      });

      describe("ToolTip opened", () => {
        it("Should have error, ToolTip is opened", () => {
          const error = {
            email: { hasError: true, message: "email error" },
            password: { hasError: true, message: "password error" },
          };

          const errorAlertMessage = {
            visible: true,
            alertType: "danger",
          };
          wrapper = shallow(
            <LoginForm
              onChange={mockOnChange}
              setFormType={mockToggleFormType}
              handleButtonClick={mockHandleSubmitClick}
              hasErrors={error}
              alertMessage={errorAlertMessage}
              error_message=""
              dismissAlert={mockDismissAlert}
            />
          );

          expect(wrapper.find("Alert")).toHaveLength(1);
          expect(wrapper.find("Alert").prop("open")).toBeTruthy();
          expect(wrapper.find("Alert").prop("theme")).toEqual("danger");

          expect(wrapper.find("FormInput")).toHaveLength(2);
          expect(wrapper.find("FormInput").at(0).prop("invalid")).toBeTruthy();
          expect(wrapper.find("FormInput").at(1).prop("invalid")).toBeTruthy();
          expect(wrapper.find("Tooltip")).toHaveLength(2);
          expect(wrapper.find("Tooltip").at(0).prop("open")).toBeTruthy();
          expect(wrapper.find("Tooltip").at(1).prop("open")).toBeTruthy();
        });
      });
    });
  });

  describe("functions", () => {
    it("dismissAlert should close alert message", () => {
      const errorAlertMessage = {
        visible: true,
        alertType: "danger",
      };

      wrapper.setState({ alertMessage: errorAlertMessage });
      wrapper.instance().dismissAlert();

      expect(wrapper.state().alertMessage).toEqual({
        alertType: "danger",
        visible: false,
      });
      expect(wrapper.state().hasErrors).toEqual(DEFAULT_ERRORS);
    });

    describe("handleResponse is called", () => {
      it("BAD_REQUEST response", () => {
        const BAD_REQUEST_RESPONSE = {
          status: "BAD_REQUEST",
          errors: [
            {
              field: "password",
              message: "does not matter 💩",
            },
          ],
          message: "BAD_REQUEST message",
        };

        wrapper.instance().handleErrorResponse(BAD_REQUEST_RESPONSE);
        expect(wrapper.state().alertMessage).toEqual({
          alertType: "danger",
          visible: true,
        });
        expect(wrapper.state().hasErrors).toEqual({
          ...DEFAULT_ERRORS,
          password: {
            hasError: true,
            message: BAD_REQUEST_RESPONSE.errors[0].message,
          },
        });
        expect(wrapper.state().error_message).toEqual(
          BAD_REQUEST_RESPONSE.message
        );
      });

      it("UNAUTHORIZED response", () => {
        const UNAUTHORIZED_RESPONSE = {
          status: "UNAUTHORIZED",
          message: "UNAUTHORIZED message",
        };

        wrapper.instance().handleErrorResponse(UNAUTHORIZED_RESPONSE);
        expect(wrapper.state().alertMessage).toEqual({
          alertType: "danger",
          visible: true,
        });
        expect(wrapper.state().hasErrors).toEqual({
          email: {
            hasError: true,
            message: "email might not exist in system.",
          },
          password: {
            hasError: true,
            message: "forgot your password?",
          },
        });
        expect(wrapper.state().error_message).toEqual(
          UNAUTHORIZED_RESPONSE.message
        );
      });
    });

    it("onFormChange is called when form input is changed", () => {
      const mockDOMevent = {
        target: {
          name: "email",
          value: "billSnapUser",
        },
      };
      wrapper.instance().onFormChange(mockDOMevent);
      expect(wrapper.state().user_credentials).toEqual({
        email: mockDOMevent.target.value,
        password: "",
      });
      expect(wrapper.state().hasErrors).toEqual(DEFAULT_ERRORS);
    });

    describe("handleSubmitClick", () => {
      it("should follow steps on passing request", async () => {
        const mockDOMevent = {
          preventDefault: jest.fn(),
        };
        const mockPushFunction = jest.fn();
        login.mockResolvedValue({ token: "billsnaptest " });

        wrapper.instance().dismissAlert = mockDismissAlert;
        wrapper.instance().setState = setState;
        // wrapper.instance().handleErrorResponse = mockHandleResponse;
        wrapper.setProps({
          history: {
            push: mockPushFunction,
          },
        });

        await wrapper.instance().handleSubmitClick(mockDOMevent);

        expect(mockDismissAlert).toBeCalledTimes(1);
        expect(login).toBeCalledTimes(1);
        expect(mockPushFunction).toBeCalledTimes(1);
        expect(setState).toBeCalledTimes(2);
      });

      it("should follow steps on passing request with no token", async () => {
        const mockDOMevent = {
          preventDefault: jest.fn(),
        };
        const mockPushFunction = jest.fn();
        login.mockResolvedValue({});

        wrapper.instance().handleErrorResponse = mockHandleResponse;
        wrapper.setProps({
          history: {
            push: mockPushFunction,
          },
        });

        await wrapper.instance().handleSubmitClick(mockDOMevent);

        expect(login).toBeCalledTimes(1);
        expect(mockPushFunction).toBeCalledTimes(0);
        expect(mockHandleResponse).toBeCalledTimes(1);
        
      });
      it("should follow steps on failing request", async () => {
        const mockDOMevent = {
          preventDefault: jest.fn(),
        };
        const ERROR_MESSAGE = 'haha it failed 💩';
        login.mockRejectedValue(ERROR_MESSAGE);

        wrapper.instance().handleErrorResponse = mockHandleResponse;

        await wrapper.instance().handleSubmitClick(mockDOMevent);

        expect(login).toBeCalledTimes(1);
        expect(mockHandleResponse).toHaveBeenCalledWith(ERROR_MESSAGE);
        
      });
    });

    it.skip("click formToggle", () => {
      wrapper.find(".form__toggle").simulate("click");
      expect(mockToggleFormType).toBeCalledTimes(1);
    });
  });
});
