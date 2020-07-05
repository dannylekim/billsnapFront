import React from "react";
import TitleContent from "../../components/TitleContent";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import Navbar from "../../components/Navbar";
import "./styles.scss";

/**
 * @description container component that should be in the middle of the login page
 */

export default (props) => {

    const {
        history,
        toggleFormType,
        formType
    } = props;

    return (
        <div className="page__landing">
            <Navbar/>
            <div className="page__content">
                <TitleContent/>
                <div>
                    {formType === "register" ? (
                        <RegisterForm setFormType={toggleFormType} history={history}/>
                    ) : (
                        <LoginForm setFormType={toggleFormType} history={history}/>
                    )}
                </div>
            </div>
        </div>
    );
};
