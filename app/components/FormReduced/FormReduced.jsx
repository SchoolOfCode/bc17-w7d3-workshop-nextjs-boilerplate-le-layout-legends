//import all our dependencies and components
import { useEffect, useState, useReducer } from "react";
import styles from "./FormReduced.module.css";
import MessageBox from "./MessageBox/MessageBox";
import validateInput from "./Validation";

export default function FormReduced() {
  const [error, setError] = useState(false);

  // function handlers
  // validates the form fields to ensure they are not empty. returns true if all fields are filled in (all have truthy values), false if any are empty (have falsy values).
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
  //sets the error state to the opposite of the validateForm function (i.e. if the form is valid (i.e. truthy), then error state is false,
  //if the form is not valid at least 1 is falsy), the error state is true)
  useEffect(() => {
    setError(!validateForm());
  }, [validateForm]);
  //
  const reducer = (state, action) => {
    switch (action.type) {
      //if the field is changed, update the form state with the new value
      case "FIELD_CHANGED":
        return {
          ...state,
          form: {
            ...state.form,
            // square brackets allow unpacking of the field name - dynamic property name determined at run time
            [action.payload.fieldName]: action.payload.fieldValue,
          },
        };
      //if the form is submitted, update the message box state with the new value- does not use dyanmic property name
      case "FORM_SUBMITTED":
        return {
          ...state,
          messageBox: {
            ...state.messageBox,
            //directly target the properties of the message box state ajd updates with new values from the action payload from the handleSubmit function
            showMessageActive: action.payload.showMessageActive,
            showMessageType: action.payload.showMessageType,
            showMessageText: action.payload.showMessageText,
          },
        };
      //if there is an error, update the error state with the new value - same structure as the field changed case
      case "ERROR":
        return {
          ...state,
          errors: {
            ...state.errors,
            [action.payload.fieldName]: action.payload.errorValue, // Update only the specific field
          },
        };
      //if none of the above cases are met, return the state as is
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
  // takes in event as a parameter, and updates the form state with the new value of the field that has been changed as it targets the name of the field that has been changed
  function handleChange(event) {
    //dispatches the field changed action, passing in the field name and the new value of the field to the reducer. type lets reducer know which case to execute
    dispatch({
      type: "FIELD_CHANGED",
      //this is the payload that is passed to the reducer and used to update the state
      payload: {
        fieldName: event.target.name,
        fieldValue: event.target.value,
      },
    });
  }
  //function to handle the form submission
  const handleSubmit = (e) => {
    //prevents the default form submission behaviour stops it resetting on submission
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
          showMessageType: "Success ✅",
          showMessageText:
            "Confirmation email has been sent to your email address. Please check your inbox.",
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
        errorValue: isValid, // Pass the boolean result directly
      },
    });
  };

  return (
    <>
      <div className={styles.hero}>Design Booking </div>
      {state.messageBox.showMessageActive && (
        <MessageBox
          messageType={state.messageBox.showMessageType}
          messageText={state.messageBox.showMessageText}
        />
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
            className={state.errors.fullName === true ? styles.errorInput : ""}
            type="text"
            data-testid="fullName"
            name="fullName"
            value={state.form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {state.errors.fullName && (
            <p data-testid="fullNameError" className={styles.error}>
              Full name requires more than 3 characters
            </p>
          )}
          <label htmlFor="postCode"> Post Code </label>
          <input
            className={state.errors.postCode ? styles.errorInput : ""}
            type="text"
            data-testid="postCode"
            name="postCode"
            value={state.form.postCode}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {state.errors.postCode && (
            <p data-testid="postCodeError" className={styles.error}>Please enter a valid postcode</p>
          )}
          <label htmlFor="streetAddress">
            House/Flat Number and Street Name
          </label>
          <input
            className={state.errors.streetAddress ? styles.errorInput : ""}
            type="text"
            data-testid="streetAddress"
            name="streetAddress"
            value={state.form.streetAddress}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {state.errors.streetAddress && (
            <p data-testid="addressError" className={styles.error}>Please enter a valid address</p>
          )}
          <label htmlFor="city"> City </label>
          <input
            className={state.errors.city ? styles.errorInput : ""}
            type="text"
            data-testid="city"
            name="city"
            value={state.form.city}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {state.errors.city ? (
            <p data-testid="cityError" className={styles.error}>Please enter a valid city</p>
          ) : ""}
        </fieldset>
        <legend>Contact Information</legend>
        <fieldset className={styles.contactInfo}>
          <label htmlFor="phoneNumber"> Phone Number </label>
          <input
            className={state.errors.phoneNumber ? styles.errorInput : ""}
            type="number"
            data-testid="phoneNumber"
            name="phoneNumber"
            value={state.form.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {state.errors.phoneNumber ? (
            <p data-testid="phoneNumberError" className={styles.error}>Please enter a valid UK phone number</p>
          ) : ""}
          <label htmlFor="email"> Email Address </label>
          <input
            className={state.errors.email ? styles.errorInput : ""}
            type="email"
            data-testid="email"
            name="email"
            value={state.form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {state.errors.email ? (
            <p data-testid="emailError" className={styles.error}>Please enter a valid email</p>
          ) : ""}
        </fieldset>
        <button
          data-testid="button"
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
