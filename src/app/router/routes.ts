import Home from 'src/pages/home/Home'
import Management from 'src/pages/management/Management'
// import About from '../../pages/about/About'
import { MANAGEMENT_ROUTE, HOME_ROUTE } from './consts'

export const routes = [
	{ path: HOME_ROUTE, Component: Home },
	{ path: MANAGEMENT_ROUTE, Component: Management }
]
