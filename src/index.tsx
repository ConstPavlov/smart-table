import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { router } from './app/router/router'
import { RouterProvider } from 'react-router-dom'
import './app/scss/App.style'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(<RouterProvider router={router} />)
