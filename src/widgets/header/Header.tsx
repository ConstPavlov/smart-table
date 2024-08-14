import React from 'react'
import NavLinks from 'src/features/nav-bar/NavLinks'
import MenuIcon from '../../app/assets/menu-ico.svg'
import ShareIcon from '../../app/assets/share-ico.svg'

import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<div className={styles.header}>
			<Link to='/menu' className={styles.ico}>
				<MenuIcon className={styles.icon} />
			</Link>
			<Link to='/share' className={styles.ico}>
				<ShareIcon className={styles.icon} />
			</Link>
			<div className={styles.ico}></div>
			<NavLinks />
		</div>
	)
}
