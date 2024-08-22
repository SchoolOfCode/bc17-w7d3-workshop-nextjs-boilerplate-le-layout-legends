//import all our dependencies and components
import { useEffect, useState, useReducer } from "react";
import styles from "./FormReduced.module.css";
import MessageBox from "./MessageBox/MessageBox";
import validateInput from "./Validation";

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
                        showMessageText: action.payload.showMessageText
                    },
                };
            case "ERROR":
                return {
                    ...state,
                    errors: {
                        ...state.errors,
                        [action.payload.fieldName]: action.payload.errorValue // Update only the specific field
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
        }, 5000);
    };
    //on blur is a buult in event listener that is triggered when the user leaves the input field
    //this function checks if the full name field is less than 3 characters long, and if it is, it sets the error state to true
    //if the full name field is greater than 3 characters long, it sets the error state to false - this means we are resetting the error state once filled in, not leaving it as true
    const handleBlur = async (event) => {
        const isValid = await validateInput(event.target.name, event.target.value);
        dispatch({
            type: "ERROR",
            payload: {
                fieldName: event.target.name, 
                errorValue: isValid // Pass the boolean result directly
            }
        });
    };


    return (
        <>
            <div className={styles.hero}>Design Booking </div>
            {state.messageBox.showMessageActive && <MessageBox
                messageType={state.messageBox.showMessageType}
                messageText={state.messageBox.showMessageText}
            />}
            <form
                className={`${styles.form} ${state.messageBox.showMessageActive && styles.hide}`}
                onSubmit={handleSubmit}
            >
                <legend>Personal Information</legend>
                <fieldset className={styles.personalInfo}>
                    <label htmlFor="fullName"> Full Name </label>
                    <input
                        className={state.errors.fullName === true ? styles.errorInput : ""}
                        type="text"
                        name="fullName"
                        value={state.form.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.fullName && <p className={styles.error}>Full name requires more than 3 characters</p>}
                    <label htmlFor="postCode"> Post Code </label>
                    <input
                        className={state.errors.postCode && styles.errorInput}
                        type="text"
                        name="postCode"
                        value={state.form.postCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.postCode && <p className={styles.error}>Please enter a valid postcode</p>}
                    <label htmlFor="streetAddress">
                        House/Flat Number and Street Name
                    </label>
                    <input
                        className={state.errors.streetAddress && styles.errorInput}
                        type="text"
                        name="streetAddress"
                        value={state.form.streetAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.streetAddress && <p className={styles.error}>Please enter a valid address</p>}
                    <label htmlFor="city"> City </label>
                    <input
                        className={state.errors.city && styles.errorInput}
                        type="text"
                        name="city"
                        value={state.form.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.city && <p className={styles.error}>Please enter a valid city</p>}
                </fieldset>
                <legend>Contact Information</legend>
                <fieldset className={styles.contactInfo}>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input
                        className={state.errors.phoneNumber && styles.errorInput}
                        type="number"
                        name="phoneNumber"
                        value={state.form.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.phoneNumber && <p className={styles.error}>Please enter a valid UK phone number</p>}
                    <label htmlFor="email"> Email Address </label>
                    <input
                        className={state.errors.email && styles.errorInput}
                        type="email"
                        name="email"
                        value={state.form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></input>
                    {state.errors.email && <p className={styles.error}>Please enter a valid email</p>}
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
