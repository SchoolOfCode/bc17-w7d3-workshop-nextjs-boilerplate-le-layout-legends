import { useEffect, useState, useReducer } from "react";
import styles from "./FormReduced.module.css";
import MessageBox from "./MessageBox/MessageBox";

export default function FormReduced() {
    const [error, setError] = useState(false);

    // function handlers

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

    useEffect(() => {
        setError(!validateForm());
    }, [validateForm]);

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
            default:
                return state;
        }
    };

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

        messageBox: {
            showMessageActive: false,
            showMessageType: "",
            showMessageText: "",
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
                    ></input>
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
                {error ? <p className={styles.error}>{error}</p> : null}
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
