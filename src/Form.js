import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

// setting up our state and status
const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("The status has changed:", status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    // rendering our form and previously submitted forms
    return (
        <div className="form-container">
            <Form>
                <label htmlFor="username">Your name
                    <Field id="username" type="text" name="username" placeholder="Joe Smith" />
                    {touched.username && errors.username && (
                        <p className="errors">{errors.username}</p>
                    )}
                </label>
                <label htmlFor="email">Your email
                    <Field id="email" type="email" name="email" placeholder="jsmith@yahoo.com" />
                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>
                <label htmlFor="password">Your Password
                    <Field id="password" type="password" name="password" placeholder="24_sUp@r_k0oL" />
                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>
                <label className="checkbox-container" htmlFor="termsOfService">I have read and agree to the <a href="#">Terms of Service</a>.
                    <Field id="termsOfService" type="checkbox" name="termsOfService" checked={values.termsOfService} />
                    {touched.termsOfService && errors.termsOfService && (
                        <p className="errors">{errors.termsOfService}</p>
                    )}
                </label>
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => {
                return (
                    <ul key={user.id}>
                        <li>Username: {user.username}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                    </ul>
                );
            })}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues(props) {
        return {
            username: props.username || "",
            email: props.email || "",
            password: props.password || "",
            termsOfService: props.termsOfService || false
        };
    },
    // checking for proper form submissions
    validationSchema: Yup.object().shape({
        username: Yup.string().required("What's your name?"),
        email: Yup.string().email("Email not valid").required("Please submit your email"),
        password: Yup.string().min(8, "Password needs to be 8 or more characters").required("Double check that password"),
        termsOfService: Yup.boolean().oneOf([true], "Please accept our Terms of Service before continuing").required()
        // checkbox validation goes here
    }),
    // sending form submission and receiving it back
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("sending request", values);
        axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
                console.log("receiving reply", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(error => {
                console.log("error occured", error)
            });
    }
})(UserForm);

export default FormikUserForm;