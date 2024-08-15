import Image from "next/image";
import styles from "./MenuButton.module.css";

const MenuButton = ({ buttonState, buttonHandler }) => {
	return buttonState ? (
		<button className={styles.menuButton} onClick={() => buttonHandler()}>
			<Image alt="Menu button" src="/images/menu-close-button.png" width={30} height={30} />
		</button>
	) : (
		<button className={styles.menuButton} onClick={() => buttonHandler()}>
			<Image alt="Menu button" src="/images/menu-open-button.png" width={30} height={30} />
		</button>
	);
};

export default MenuButton;
