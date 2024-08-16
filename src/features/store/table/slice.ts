import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataItem } from 'src/features/editable-row/editable-interface'
import { generateUniqueId } from 'src/features/helpers/generateUniqueId'
import { geIDFromLS } from 'src/features/utils/getFromLS'
import { setToLS } from 'src/features/utils/setToLS'
import {
	createTableId,
	fetchCreateRow,
	fetchListOfRows,
	fetchRemoveRow,
	fetchUpdateRow
} from './service'
import { ITable, Status } from './types'

// const idT = geIDFromLS('idTable')

const initialState: ITable = {
	data: [],
	idSet: new Set(),
	idTable: null,
	status: Status.LOADING,
	error: null
}

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setData(state, action: PayloadAction<IDataItem[]>) {
			state.data = action.payload
			state.idSet = new Set(
				state.data.flatMap((item) => [
					item.id,
					...item.child.flatMap((child) => [
						child.id,
						...child.child.map((grandchild) => grandchild.id)
					])
				])
			)
		},
		addRow(state, action: PayloadAction<{ parentId: number | null }>) {
			const { parentId } = action.payload
			const newId = generateUniqueId(state.idSet)

			const newRow: IDataItem = {
				id: newId,
				rowName: '',
				salary: 0,
				equipmentCosts: 0,
				overheads: 0,
				estimatedProfit: 0,
				machineOperatorSalary: 0,
				mainCosts: 0,
				materials: 0,
				machine: 0,
				mimExploitation: 0,
				supportCosts: 0,
				isEditing: true,
				child: [],
				parentId: parentId === 1 ? null : parentId
			}

			const addRowToParent = (
				items: IDataItem[],
				parentId: number | null
			): IDataItem[] => {
				return items.map((item) => {
					if (item.id === parentId) {
						return { ...item, child: [...item.child, newRow] }
					} else {
						return { ...item, child: addRowToParent(item.child, parentId) }
					}
				})
			}

			state.data =
				parentId === null
					? [...state.data, newRow]
					: addRowToParent(state.data, parentId)
			state.idSet.add(newId)
		},
		deleteRow(state, action: PayloadAction<number>) {
			const deleteRowFromData = (
				items: IDataItem[],
				id: number
			): IDataItem[] => {
				return items
					.filter((item) => item.id !== id)
					.map((item) => ({
						...item,
						child: deleteRowFromData(item.child, id)
					}))
			}

			state.data = deleteRowFromData(state.data, action.payload)
			state.idSet.delete(action.payload)
		},
		updateInput(
			state,
			action: PayloadAction<{ id: number; field: keyof IDataItem; value: any }>
		) {
			const { id, field, value } = action.payload

			const updateItem = (items: IDataItem[], id: number): IDataItem[] => {
				return items.map((item) => {
					if (item.id === id) {
						return { ...item, [field]: value }
					} else if (item.child) {
						return { ...item, child: updateItem(item.child, id) }
					}
					return item
				})
			}

			state.data = updateItem(state.data, id)
		},
		toggleEditing(state, action: PayloadAction<number>) {
			const id = action.payload

			const updateItem = (items: IDataItem[], id: number): IDataItem[] => {
				return items.map((item) => {
					if (item.id === id) {
						return { ...item, isEditing: !item.isEditing }
					} else if (item.child) {
						return { ...item, child: updateItem(item.child, id) }
					}
					return item
				})
			}

			state.data = updateItem(state.data, id)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createTableId.fulfilled, (state, action) => {
			state.idTable = action.payload
			state.status = Status.SUCCESS
			setToLS('idTable', action.payload)
			console.log(action, 'SUCCESS')
		})
		builder.addCase(createTableId.pending, (state, action) => {
			state.idTable = null
			state.status = Status.LOADING
			console.log(action, 'LOADING')
		})
		builder
			.addCase(createTableId.rejected, (state, action) => {
				state.idTable = null
				state.status = Status.ERROR
			})
			.addCase(fetchListOfRows.pending, (state) => {
				state.status = Status.LOADING
			})
			.addCase(
				fetchListOfRows.fulfilled,
				(state, action: PayloadAction<IDataItem[]>) => {
					state.status = Status.SUCCESS
					state.data = action.payload
					state.idSet = new Set(
						state.data.flatMap((item) => [
							item.id,
							...item.child.flatMap((child) => [
								child.id,
								...child.child.map((grandchild) => grandchild.id)
							])
						])
					)
				}
			)
			.addCase(fetchListOfRows.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.error.message || 'Failed to fetch list of rows'
			})
			.addCase(fetchCreateRow.pending, (state) => {
				state.status = Status.LOADING
			})
			.addCase(fetchCreateRow.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				// Handle row creation if needed
			})
			.addCase(fetchCreateRow.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.error.message || 'Failed to create row'
			})
			.addCase(fetchUpdateRow.pending, (state) => {
				state.status = Status.LOADING
			})
			.addCase(
				fetchUpdateRow.fulfilled,
				(state, action: PayloadAction<IDataItem>) => {
					state.status = Status.SUCCESS
				}
			)
			.addCase(fetchUpdateRow.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.error.message || 'Failed to update row'
			})
			.addCase(fetchRemoveRow.pending, (state) => {
				state.status = Status.LOADING
			})
			.addCase(fetchRemoveRow.fulfilled, (state) => {
				state.status = Status.SUCCESS
			})
			.addCase(fetchRemoveRow.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.error.message || 'Failed to remove row'
			})
	}
})

export const { setData, addRow, deleteRow, updateInput, toggleEditing } =
	tableSlice.actions

export default tableSlice.reducer
