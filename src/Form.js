import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";


const UserForm = ((props) => {
    return (
        <Form>
            <label htmlFor="username">
                <Field id="username" type="text" name="username" />
            </label>
            <label htmlFor="email">
                <Field id="email" type="email" name="email" />
            </label>
            <label htmlFor="password">
                <Field id="password" type="password" name="password" />
            </label>
            <label className="checkbox-container" htmlFor="termsOfService">
                <Field id="termsOfService" type="checkbox" name="termsOfService" />
            </label>
            <button type="submit" disabled="isSubmitting">Submit</button>
        </Form>
    );
});

const FormikUserForm = withFormik({
    mapPropsToValues(props) {
        return {
            username: props.username || "",
            email: props.email || "",
            password: props.password || "",
            termsOfService: props.termsOfService || false
        };
    }
})(UserForm);

export default FormikUserForm;