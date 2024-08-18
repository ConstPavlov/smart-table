import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import { store } from 'src/features/store/store'
import { HomeLazy } from 'src/pages/home/HomeLazy'
import { ManageLazy } from 'src/pages/management/ManageLazy'
import Management from 'src/pages/management/Management'
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
				element: (
					<Suspense fallback={<h1>Загрузка...</h1>}>
						<ManageLazy />
					</Suspense>
				)
			},
			{
				path: '/',
				element: (
					<Suspense fallback={<h1>Загрузка...</h1>}>
						<HomeLazy />
					</Suspense>
				)
			}
		]
	}
])
