import React from "react";
import { useState } from "react";
import styles from "./Form.module.css";

export default function Form() {
	const [fullName, setFullName] = useState("");
	const [postCode, setPostCode] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [city, setCity] = useState("");

	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const [error, setError] = useState("");

	const handleName = (event) => {
		setFullName(event.target.value);
		event.target.value.length < 3 ? setError("Please enter a valid name") : setError("");
	};
	const handlePostCode = (event) => {
		setPostCode(event.target.value);
		event.target.value.length < 6 ? setError("Please enter a valid post code") : setError("");
	};
	const handleStreetAddress = (event) => {
		setStreetAddress(event.target.value);
		event.target.value === "" ? setError("Please enter your street address") : setError("");
	};
	const handleCity = (event) => {
		setCity(event.target.value);
		event.target.value === "" ? setError("Please enter your city") : setError("");
	};
	const handlePhoneNumber = (event) => {
		setPhoneNumber(event.target.value);
		event.target.value.length < 10 ? setError("Please enter a valid phone number") : setError("");
	};
	const handleEmail = (event) => {
		setEmail(event.target.value);
		event.target.value === "" ? setError("Please enter your email address") : setError("");
	};

	const handleClick = () => {
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
			<form>
				<fieldset>
					<legend>Personal Information</legend>
					<label htmlFor="fullName"> Full Name </label>
					<input
						type="text"
						id="fullName"
						value={fullName}
						onChange={handleName}
					></input>
					<label htmlFor="postCode"> Post Code </label>
					<input
						type="text"
						id="postCode"
						value={postCode}
						onChange={handlePostCode}
					></input>
					<label htmlFor="streetAddress">
						{" "}
						House/Flat Number and Street Name{" "}
					</label>
					<input
						type="text"
						id="streetAddress"
						value={streetAddress}
						onChange={handleStreetAddress}
					></input>
					<label htmlFor="city"> City </label>
					<input
						type="text"
						id="city"
						value={city}
						onChange={handleCity}
					></input>
				</fieldset>

				<fieldset>
					<legend>Contact Information</legend>
					<label htmlFor="phoneNumber"> Phone Number </label>
					<input
						type="text"
						id="phoneNumber"
						value={phoneNumber}
						onChange={handlePhoneNumber}
					></input>
					<label htmlFor="email"> Email Address </label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={handleEmail}
					></input>
				</fieldset>
			</form>
			{error ? <p className={styles.error} >{error}</p> : null}

			<button onClick={handleClick} type="submit" disabled={error ? true : false} >Request Design Consultation</button>
		</>
	);
}

