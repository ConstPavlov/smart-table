import './scss/App.style'
import { Outlet } from 'react-router-dom'
import Header from 'src/widgets/header/Header'

export function App() {
	return (
		<div className='App'>
			<Header />
			<Outlet />
		</div>
	)
}
