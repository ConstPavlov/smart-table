import { configureStore } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer'
import React from 'react'
import { useDispatch } from 'react-redux'
import table from './table/slice'

enableMapSet()
export const store = configureStore({
	reducer: {
		table
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
