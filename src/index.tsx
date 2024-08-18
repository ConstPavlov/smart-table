import React from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './app/router/router'
import { RouterProvider } from 'react-router-dom'
import './app/scss/style.scss'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(<RouterProvider router={router} />)
