import { useEffect, useState, useReducer } from "react";
import styles from "./FormReduced.module.css";

export default function FormReduced() {

	const [error, setError] = useState(false);

	// function handlers

	const validateForm = () => {
		return (
			state.fullName !== "" &&
			state.postCode !== "" &&
			state.streetAddress !== "" &&
			state.city !== "" &&
			state.phoneNumber !== "" &&
			state.email !== ""
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
					[action.payload.fieldName]: action.payload.fieldValue
				};
			default:
				return state
		};
	};

	const [state, dispatch] = useReducer(reducer, {
		fullName: "",
		postCode: "",
		streetAddress: "",
		city: "",
		phoneNumber: "",
		email: "",
		loading: false,
		showMessageActive: false,
		showMessageType: "",
		showMessageText: ""
	});

	function handleChange(event) {
		dispatch({
			type: "FIELD_CHANGED",
			payload: {
				fieldName: event.target.name,
				fieldValue: event.target.value
			}
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: "FIELD_CHANGED",
			payload: {
				fieldName: "loading",
				fieldValue: true
			}
		})
		setTimeout(() => {
			dispatch({
				type: "FIELD_CHANGED",
				payload: {
					fieldName: "showMessageActive",
					fieldValue: true
				}
			})
			console.dir(state);
		}, 5000)

	};

	return (
		<>
			<div className={styles.hero}>Design Booking </div>
			<div className={`${styles.messageBox} ${state.showMessageActive ? "" : styles.hide}`}>Display something here</div>
			<form className={`${styles.form} ${state.showMessageActive ? styles.hide : ""}`} onSubmit={handleSubmit}>
				<legend>Personal Information</legend>
				<fieldset className={styles.personalInfo}>
					<label htmlFor="fullName"> Full Name </label>
					<input
						type="text"
						name="fullName"
						value={state.fullName}
						onChange={handleChange}
					></input>
					<label htmlFor="postCode"> Post Code </label>
					<input
						type="text"
						name="postCode"
						value={state.postCode}
						onChange={handleChange}
					></input>
					<label htmlFor="streetAddress">
						{" "}
						House/Flat Number and Street Name{" "}
					</label>
					<input
						type="text"
						name="streetAddress"
						value={state.streetAddress}
						onChange={handleChange}
					></input>
					<label htmlFor="city"> City </label>
					<input
						type="text"
						name="city"
						value={state.city}
						onChange={handleChange}
					></input>
				</fieldset>
				<legend>Contact Information</legend>
				<fieldset className={styles.contactInfo}>
					<label htmlFor="phoneNumber"> Phone Number </label>
					<input
						type="number"
						name="phoneNumber"
						value={state.phoneNumber}
						onChange={handleChange}
					></input>
					<label htmlFor="email"> Email Address </label>
					<input
						type="email"
						name="email"
						value={state.email}
						onChange={handleChange}
					></input>
				</fieldset>
				{error ? <p className={styles.error}>{error}</p> : null}
				<button
					className={styles.buttonStyle}
					type="submit"
					disabled={error ? true : false}
				>
					{state.loading === true ? "Requesting ..." : "Request Design Consultation"}
				</button>
			</form>
		</>
	);
}

