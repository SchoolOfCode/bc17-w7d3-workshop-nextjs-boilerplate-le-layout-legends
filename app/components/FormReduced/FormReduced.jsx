import { useEffect, useState } from "react";
import styles from "./FormReduced.module.css";

export default function FormReduced() {
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
        return (
            fullName !== "" &&
            postCode !== "" &&
            streetAddress !== "" &&
            city !== "" &&
            phoneNumber !== "" &&
            email !== ""
        );
    };

    function handleChange(event) {
        if (event.target.name === "fullName") {
            setFullName(event.target.value);
        }
        if (event.target.name === "postCode") {
            setPostCode(event.target.value);
        }
        if (event.target.name === "streetAddress") {
            setStreetAddress(event.target.value);
        }
        if (event.target.name === "city") {
            setCity(event.target.value);
        }
        if (event.target.name === "phoneNumber") {
            setPhoneNumber(event.target.value);
        }
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
	}

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
                email,
            });
        };
	
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
                            onChange={handleChange}
                        ></input>
                        <label htmlFor="postCode"> Post Code </label>
                        <input
                            type="text"
                            name="postCode"
                            value={postCode}
                            onChange={handleChange}
                        ></input>
                        <label htmlFor="streetAddress">
                            {" "}
                            House/Flat Number and Street Name{" "}
                        </label>
                        <input
                            type="text"
                            name="streetAddress"
                            value={streetAddress}
                            onChange={handleChange}
                        ></input>
                        <label htmlFor="city"> City </label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        ></input>
                    </fieldset>
                    <legend>Contact Information</legend>
                    <fieldset className={styles.contactInfo}>
                        <label htmlFor="phoneNumber"> Phone Number </label>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handleChange}
                        ></input>
                        <label htmlFor="email"> Email Address </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        ></input>
                    </fieldset>
                    {error ? <p className={styles.error}>{error}</p> : null}
                    <button
                        className={styles.buttonStyle}
                        type="submit"
                        disabled={error ? true : false}
                    >
                        Request Design Consultation
                    </button>
                </form>
            </>
        );
    }

