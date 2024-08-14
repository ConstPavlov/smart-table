import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import { store } from 'src/features/store/store'
import Management from 'src/pages/management/Management'
// import { store } from '../../features'
import Home from '../../pages/home/Home'
import { App } from '../App'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Provider store={store}>
				<App />
			</Provider>
		),
		children: [
			{
				path: '/management',
				element: <Management />
			},
			{
				path: '/',
				element: <Home />
			}
		]
	}
])
