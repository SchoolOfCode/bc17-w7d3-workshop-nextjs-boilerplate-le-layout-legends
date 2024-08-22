//import all our dependencies and components
import { useEffect, useState, useReducer } from "react";
import styles from "./FormReduced.module.css";
import MessageBox from "./MessageBox/MessageBox";

export default function FormReduced() {
    const [error, setError] = useState(false);

    // function handlers
    // validates the form fields to ensure they are not empty. returns true if all fields are filled in, false if any are empty.
    //part of enable/disable form submission
    const validateForm = () => {
        return (
            state.form.fullName !== "" &&
            state.form.postCode !== "" &&
            state.form.streetAddress !== "" &&
            state.form.city !== "" &&
            state.form.phoneNumber !== "" &&
            state.form.email !== ""
        );
    };
    // useEffect hook to check if the form is valid on each render (i.e. every time something changes/box is filled in).
    //If the form is not valid, the submit button is disabled.
    useEffect(() => {
        setError(!validateForm());
    }, [validateForm]);
    //
    const reducer = (state, action) => {
        switch (action.type) {
            case "FIELD_CHANGED":
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [action.payload.fieldName]: action.payload.fieldValue,
                    },
                };
            case "FORM_SUBMITTED":
                return {
                    ...state,
                    messageBox: {
                        ...state.messageBox,
                        showMessageActive: action.payload.showMessageActive,
                        showMessageType: action.payload.showMessageType,
                        showMessageText: action.payload.showMessageText,
                    },
                };
            case "ERROR":
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        fullName: action.payload.fullName,
                        postCode: action.payload.postCode,
                        streetAddress: action.payload.streetAddress,
                        city: action.payload.city,
                        phoneNumber: action.payload.phoneNumber,
                        email: action.payload.email,
                    },
                };
            default:
                return state;
        }
    };
    // initialise our state for each form field as emprty strings. Loading state is set to false as form is in edit mode
    const [state, dispatch] = useReducer(reducer, {
        form: {
            fullName: "",
            postCode: "",
            streetAddress: "",
            city: "",
            phoneNumber: "",
            email: "",
            loading: false,
        },
        // initialise our state for the message box as false, so it is not displayed - messages are empty strings too.
        messageBox: {
            showMessageActive: false,
            showMessageType: "",
            showMessageText: "",
        },
        // initialise our state for the errors as false, so they are not displayed
        errors: {
            fullName: false,
            postCode: false,
            streetAddress: false,
            city: false,
            phoneNumber: false,
            email: false,
        },
    });

    function handleChange(event) {
        dispatch({
            type: "FIELD_CHANGED",
            payload: {
                fieldName: event.target.name,
                fieldValue: event.target.value,
            },
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "FIELD_CHANGED",
            payload: {
                fieldName: "loading",
                fieldValue: true,
            },
        });
        setTimeout(() => {
            dispatch({
                type: "FORM_SUBMITTED",
                payload: {
                    showMessageActive: true,
                    showMessageType: "Success",
                    showMessageText: "Form successfully submitted!",
                },
            });
            console.dir(state);
        }, 5000);
    };
    //on blur is a buult in event listener that is triggered when the user leaves the input field
    //this function checks if the full name field is less than 3 characters long, and if it is, it sets the error state to true
    //if the full name field is greater than 3 characters long, it sets the error state to false - this means we are resetting the error state once filled in, not leaving it as true
    const handleBlur = (event) => {
        if (event.target.name === "fullName") {
            event.target.value.length <= 3
                ? dispatch({
                      type: "ERROR",
                      payload: {
                          fullName: true,
                      },
                  })
                : dispatch({
                      type: "ERROR",
                      payload: {
                          fullName: false,
                      },
                  });
        }
    };
    

    return (
        <>
            <div className={styles.hero}>Design Booking </div>
            {state.messageBox.showMessageActive === true ? (
                <MessageBox
                    messageType={state.messageBox.showMessageType}
                    messageText={state.messageBox.showMessageText}
                />
            ) : (
                ""
            )}
            <form
                className={`${styles.form} ${
                    state.messageBox.showMessageActive ? styles.hide : ""
                }`}
                onSubmit={handleSubmit}
            >
                <legend>Personal Information</legend>
                <fieldset className={styles.personalInfo}>
                    <label htmlFor="fullName"> Full Name </label>
                    <input
                        type="text"
                        name="fullName"
                        value={state.form.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.fullName === true ? (
                        <p className={styles.error}>Full name requires more than 3 characters</p>
                    ) : (
                        ""
                    )}
                    <label htmlFor="postCode"> Post Code </label>
                    <input
                        type="text"
                        name="postCode"
                        value={state.form.postCode}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="streetAddress">
                        House/Flat Number and Street Name
                    </label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={state.form.streetAddress}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="city"> City </label>
                    <input
                        type="text"
                        name="city"
                        value={state.form.city}
                        onChange={handleChange}
                    ></input>
                </fieldset>
                <legend>Contact Information</legend>
                <fieldset className={styles.contactInfo}>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input
                        type="number"
                        name="phoneNumber"
                        value={state.form.phoneNumber}
                        onChange={handleChange}
                    ></input>

                    <label htmlFor="email"> Email Address </label>
                    <input
                        type="email"
                        name="email"
                        value={state.form.email}
                        onChange={handleChange}
                    ></input>
                </fieldset>
                <button
                    className={styles.buttonStyle}
                    type="submit"
                    disabled={error ? true : false}
                >
                    {state.form.loading === true
                        ? "Requesting ..."
                        : "Request Design Consultation"}
                </button>
            </form>
        </>
    );
}
