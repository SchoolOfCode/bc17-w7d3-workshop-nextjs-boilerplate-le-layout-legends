import Link from "next/link";
import styles from "./Menu.module.css";
import MenuButton from "../MenuButton/MenuButton";
import { usePathname } from "next/navigation";


const Menu = ({  buttonState, buttonHandler  }) => {

	const pathname = usePathname();

	return (
		<div className={styles.menuContainer}>
			<MenuButton buttonState={buttonState} buttonHandler={buttonHandler} />
			<ul className={styles.linksContainer}>
				<li className={styles.menuLinks}>
					<Link className={`${styles.link} ${pathname === "/" ? styles.underline : ""}`} onClick={() => buttonHandler() } href="/">Home</Link>
				</li>
				<li className={styles.menuLinks}>
					<Link className={`${styles.link} ${pathname === "/founders" ? styles.underline : ""}`} onClick={() => buttonHandler() } href="/founders">Founders</Link>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
