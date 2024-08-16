"use client";

import styles from "./Reviews.module.css";
import { useState, useEffect } from "react";
import ReviewsText from "./ReviewsText/ReviewsText";

const Reviews = () => {
	let [selectedCountry, setSelectedCountry] = useState(null);
	let [fetchedData, setFetchedData] = useState(null);

	const handleClick = (country) => setSelectedCountry(country);
	

	useEffect(() => {
		if (selectedCountry) {
			fetch(`https://seal-app-336e8.ondigitalocean.app/reviews?country=${selectedCountry}`)
				.then((response) => response.json())
				.then((data) => setFetchedData(data));
		}
	}, [selectedCountry]);
	return (
		<section className={styles.reviewsContainer}>
			<h1>Trusted.</h1>
			<p>
				We've got thousands of happy customers all over the UK. Choose your country to see the
				latest review.
			</p>
			<div className={styles.buttonsContainer}>
				<button
					onClick={() => handleClick("England")}
					className={`${styles.buttons} ${
						selectedCountry === "England" ? styles.buttonActive : ""
					}`}
				>
					England
				</button>
				<button
					onClick={() => handleClick("Wales")}
					className={`${styles.buttons} ${selectedCountry === "Wales" ? styles.buttonActive : ""}`}
				>
					Wales
				</button>
				<button
					onClick={() => handleClick("Scotland")}
					className={`${styles.buttons} ${
						selectedCountry === "Scotland" ? styles.buttonActive : ""
					}`}
				>
					Scotland
				</button>
			</div>
			{fetchedData && (
				<ReviewsText
					text={fetchedData.text}
					author={fetchedData.author}
					location={fetchedData.location}
				/>
			)}
		</section>
	);
};

export default Reviews;
