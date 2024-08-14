import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_ROUTE, MANAGEMENT_ROUTE } from '../../app/router/consts'
import styles from './NavLinks.module.scss'

const NavLinks = () => {
	return (
		<nav className={styles.nav}>
			<Link className={styles.link} to={HOME_ROUTE}>
				Просмотр
			</Link>
			<Link className={styles.link} to={MANAGEMENT_ROUTE}>
				Управление
			</Link>
		</nav>
	)
}

export default NavLinks
