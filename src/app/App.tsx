import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'src/widgets/header/Header'
import './scss/style.scss'

export function App() {
	return (
		<div className='App'>
			<Header />
			<Outlet />
		</div>
	)
}
