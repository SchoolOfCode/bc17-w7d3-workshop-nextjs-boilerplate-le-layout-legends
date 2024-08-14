"use client"

import styles from './Header.module.css'
import Link from 'next/link'
import { useState } from 'react';


const Header = () => {

	const [menuStatus, setMenuStatus] = useState(false);

	const handleClick = () => {
		setMenuStatus(!menuStatus)
		console.log(menuStatus)
	}
	
		return (
			<header className={styles.headerContainer}>
				<h1 className={styles.title}>🔥 Fireplace Palace</h1>
				{ menuStatus ? <Link className="link" href="/founders">Founders!</Link> : ""}
				<button onClick={() => { handleClick() }}>Menu!</button>
			</header>
		);
  
};

export default Header;
