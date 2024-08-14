import React from 'react'
import Sidebar from 'src/widgets/sidebar/Sidebar'
import Smp from 'src/widgets/smp/Smp'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<div className={styles.home}>
			<Sidebar />
			<Smp />
		</div>
	)
}

export default Home
