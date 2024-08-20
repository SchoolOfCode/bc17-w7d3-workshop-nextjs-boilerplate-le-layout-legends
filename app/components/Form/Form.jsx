import React from "react";
import { useState } from "react";

export default function Form() {
    const [fullName, setFullName] = useState("");
    const [postCode, setPostCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    const handleName = (event) => {
        if (event.target.value === "") {
            setError("Please enter your name");
            return;
        }
        setFullName(event.target.value);
    };
    const handlePostCode = (event) => {
        if (event.target.value === "") {
            setError("Please enter your post code");
            return;
        }
        setPostCode(event.target.value);
    };
    const handleStreetAddress = (event) => {
        if (event.target.value === "") {
            setError("Please enter your street address");
            return;
        }
        setStreetAddress(event.target.value);
    };
    const handleCity = (event) => {
        if (event.target.value === "") {
            setError("Please enter your city");
            return;
        }
        setCity(event.target.value);
    };
    const handlePhoneNumber = (event) => {
        if (event.target.value === "") {
            setError("Please enter your phone number");
            return;
        }
        setPhoneNumber(event.target.value);
    };
    const handleEmail = (event) => {
        if (event.target.value === "") {
            setError("Please enter your email address");
            return;
        }
        setEmail(event.target.value);
    };

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
            {error && <p className="error">{error}</p>}
        </>
    );
}

