import { useEffect, useState } from "react";
import styles from "./Form.module.css";

export default function Form() {

	// useState variables
	const [fullName, setFullName] = useState("");
	const [postCode, setPostCode] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [city, setCity] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);

	// function handlers

	const validateForm = () => {
		return fullName !== "" &&
			postCode !== "" &&
			streetAddress !== "" &&
			city !== "" &&
			phoneNumber !== "" &&
			email !== "";
	};



	const handleName = (event) => {
		setFullName(event.target.value);
	};
	const handlePostCode = (event) => {
		setPostCode(event.target.value);
	};

	const handleStreetAddress = (event) => {
		setStreetAddress(event.target.value);
	};
	const handleCity = (event) => {
		setCity(event.target.value);
	};
	const handlePhoneNumber = (event) => {
		setPhoneNumber(event.target.value);
	};
	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	useEffect(() => {
		setError(!validateForm());
	}, [validateForm]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.dir({
			fullName,
			postCode,
			streetAddress,
			city,
			phoneNumber,
			email
		})
	}

	return (
		<>
			<div className={styles.hero}>Design Booking</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<legend>Personal Information</legend>
				<fieldset className={styles.personalInfo}>
					<label htmlFor="fullName"> Full Name </label>
					<input
						type="text"
						name="fullName"
						value={fullName}
						onChange={handleName}
					></input>
					<label htmlFor="postCode"> Post Code </label>
					<input
						type="text"
						name="postCode"
						value={postCode}
						onChange={handlePostCode}
					></input>
					<label htmlFor="streetAddress">
						{" "}
						House/Flat Number and Street Name{" "}
					</label>
					<input
						type="text"
						name="streetAddress"
						value={streetAddress}
						onChange={handleStreetAddress}
					></input>
					<label htmlFor="city"> City </label>
					<input
						type="text"
						name="city"
						value={city}
						onChange={handleCity}
					></input>
				</fieldset>
				<legend>Contact Information</legend>
				<fieldset className={styles.contactInfo}>
					<label htmlFor="phoneNumber"> Phone Number </label>
					<input
						type="number"
						name="phoneNumber"
						value={phoneNumber}
						onChange={handlePhoneNumber}
					></input>
					<label htmlFor="email"> Email Address </label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleEmail}
					></input>
				</fieldset>
				{error ? <p className={styles.error} >{error}</p> : null}
				<button className={styles.buttonStyle} type="submit" disabled={error ? true : false} >Request Design Consultation</button>
			</form>
		</>
	);
}

