import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../app/axios/axios'
import { FetchCreateParams, FetchUpdateParams } from './types'

// createTable ID
export const createTableId = createAsyncThunk(
	'table/createTableId',
	async () => {
		try {
			const response = await axios.post('/v1/outlay-rows/entity/create')

			const idTable = await response.data.id

			return idTable
		} catch (error: any) {
			throw new Error(error)
		}
	}
)

// ---------
// get list
// ---------

export const fetchListOfRows = createAsyncThunk(
	'table/fetchListOfRows',
	async (idTable: string) => {
		const { data } = await axios.get(
			`/v1/outlay-rows/entity/${idTable}/row/list`
		)
		return data
	}
)

// ---------
// create row
// ---------
export const fetchCreateRow = createAsyncThunk(
	'table/fetchCreateRow',
	async (params: FetchCreateParams) => {
		const { idTable, newRow } = params
		const { data } = await axios.post(
			`/v1/outlay-rows/entity/${idTable}/row/create`,
			newRow
		)
		return data
	}
)

// ---------
// update row
// ---------
export const fetchUpdateRow = createAsyncThunk(
	'table/fetchUpdateRow',
	async (params: FetchUpdateParams) => {
		const { idTable, updatePayload, idUpd } = params
		const { data } = await axios.patch(
			`/v1/outlay-rows/entity/${idTable}/row/${idUpd}/update`,
			updatePayload
		)
		return data
	}
)

// ---------
// delete row
// ---------

export const fetchRemoveRow = createAsyncThunk(
	'table/fetchRemoveRow',
	async (params: any) => {
		const { idTable, idRow } = params
		axios.delete(`/v1/outlay-rows/entity/${idTable}/row/${idRow}/delete`)
	}
)
