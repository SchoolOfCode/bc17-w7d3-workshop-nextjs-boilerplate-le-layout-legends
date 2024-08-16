import styles from "./ReviewsText.module.css"

const ReviewsText = ({ text, author, location }) => {
	return (
		<>
			<div className={styles.reviewsTextBox}>
				<p>{text}</p>
			</div>

			<p className={styles.underline}>{author} - {location}</p>
		</>
	);
};

export default ReviewsText;
