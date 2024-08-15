"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { useState } from "react";
import Menu from "./Menu/Menu";
import MenuButton from "./MenuButton/MenuButton";
import { usePathname } from "next/navigation";

const Header = () => {
	let [menuStatus, setMenuStatus] = useState(false);

	let toggleMenu = () => {
		setMenuStatus(!menuStatus);
	};

	const pathname = usePathname();

	return (
		<header className={styles.headerContainer}>
			<h1 className={styles.title}>🔥 Fireplace Palace</h1>
			<MenuButton buttonState={menuStatus} buttonHandler={toggleMenu} />
			{menuStatus ? <Menu buttonState={menuStatus} buttonHandler={toggleMenu} /> : ""}
			<div className={styles.desktopNav}>
				<Link className={`${styles.navLink} ${pathname === "/" ? styles.underline : ""}`}href="/">
					Home
				</Link>
				<Link className={`${styles.navLink} ${pathname === "/founders" ? styles.underline : ""}`} href="/founders">
					Meet the founders
				</Link>
			</div>
		</header>
	);
};

export default Header;
