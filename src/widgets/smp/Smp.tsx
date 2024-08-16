import React, { KeyboardEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	EditableField,
	IDataItem,
	LabelsTable,
	TreeResponse
} from 'src/features'
import {
	addRow,
	deleteRow,
	updateInput,
	toggleEditing
} from '../../features/store/table/slice'
import EditableRow from 'src/features/editable-row/EditableRow'

import { useAppDispatch } from 'src/features/store/store'
import { tableData } from 'src/features/store/table/selector'

import styles from './Smp.module.scss'

import {
	fetchCreateRow,
	fetchListOfRows,
	fetchRemoveRow,
	fetchUpdateRow
} from 'src/features/store/table/service'
import BaseButton from 'src/features/buttons/base-btn/BaseButton'
import { OutlayRowRequest, OutlayRowUpdateRequest } from './smp-interface'
import { findItemById } from 'src/features/helpers/findItemById'
import { checkAndFetchTableId } from 'src/features/utils/api/checkAndFetchTableId'
import { fetchList } from 'src/features/utils/api/fetchList'

export default function Smp() {
	const [idTable, setIdTable] = React.useState<string | null>(null)
	const [dataServer, setSetDataServer] = React.useState<TreeResponse | []>([])
	const [hoveredBtn, setHoveredBtn] = React.useState<number | null>(null)
	const isMounted = React.useRef<boolean>(false)
	const dispatch = useAppDispatch()
	const { data, status, error } = useSelector(tableData)

	// Табличный iD и  получение Data
	React.useEffect(() => {
		const fetchTableIdAndData = async () => {
			const idTab = await checkAndFetchTableId()
			if (idTab) {
				setIdTable(idTab)
				dispatch(fetchListOfRows(String(idTab)))
			}
		}

		fetchTableIdAndData()
	}, [dispatch])

	// Добавить row в Redux
	const handleAddRow = React.useCallback(
		(parentId: number | null) => {
			dispatch(addRow({ parentId }))
		},
		[dispatch]
	)

	// Удаление строки
	const handleDeleteRow = React.useCallback(
		(id: number) => {
			dispatch(deleteRow(id))
			if (idTable) {
				dispatch(fetchRemoveRow({ idTable, idRow: id }))
			}
		},
		[dispatch, idTable]
	)

	// Обновление поля строки
	const handleInputChange = React.useCallback(
		<K extends EditableField>(id: number, field: K, value: IDataItem[K]) => {
			dispatch(updateInput({ id, field, value }))
		},
		[dispatch]
	)

	const handleEnterKey = React.useCallback(
		async (event: React.KeyboardEvent<HTMLInputElement>, id: number) => {
			const { key } = event
			if (key === 'Enter' && idTable) {
				await dispatch(toggleEditing(id))
				try {
					const dataServer: any = await fetchList()
					console.log('fetch List на возвразает:', dataServer)
					const itemToUpdate = findItemById(dataServer, id)
					console.log('findItemById на возвразает:', itemToUpdate)
					if (itemToUpdate) {
						const idUpd = String(itemToUpdate.id)
						const updatePayload: OutlayRowUpdateRequest = {
							rowName: itemToUpdate.rowName || '',
							salary: itemToUpdate.salary || 0,
							equipmentCosts: itemToUpdate.equipmentCosts || 0,
							estimatedProfit: itemToUpdate.estimatedProfit || 0,
							materials: itemToUpdate.materials || 0,
							overheads: itemToUpdate.overheads || 0,
							machineOperatorSalary: itemToUpdate.machineOperatorSalary || 0,
							mainCosts: itemToUpdate.mainCosts || 0,
							mimExploitation: itemToUpdate.mimExploitation || 0,
							supportCosts: itemToUpdate.supportCosts || 0
						}
						await dispatch(fetchUpdateRow({ idTable, updatePayload, idUpd }))
					} else {
						const itemToCreate = findItemById(data, id)

						const newRow: OutlayRowRequest = {
							rowName: itemToCreate?.rowName || '',
							salary: itemToCreate?.salary || 0,
							equipmentCosts: itemToCreate?.equipmentCosts || 0,
							estimatedProfit: itemToCreate?.estimatedProfit || 0,
							materials: itemToCreate?.materials || 0,
							overheads: itemToCreate?.overheads || 0,
							machineOperatorSalary: itemToCreate?.machineOperatorSalary || 0,
							mainCosts: itemToCreate?.mainCosts || 0,
							mimExploitation: itemToCreate?.mimExploitation || 0,
							machine: itemToCreate?.machine || 0,
							supportCosts: itemToCreate?.supportCosts || 0,
							parentId: itemToCreate?.parentId ?? null
						}

						await dispatch(fetchCreateRow({ idTable, newRow }))
					}
				} catch (error) {
					console.error('Failed to update or create row:', error)
				}
			}
		},
		[dispatch, data, idTable]
	)

	const updateFn = React.useCallback(
		(id: number) => {
			dispatch(toggleEditing(id))
		},
		[dispatch]
	)

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	if (status === 'error') {
		return <div>Error: {error}</div>
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.head}>
				<h1 className={styles.title}>Строительно-монтажные работы</h1>
			</div>

			<div className={styles.smp}>
				<LabelsTable />

				{data.length === 0 ? (
					<BaseButton handleAddRow={handleAddRow} />
				) : (
					data.map((item) => (
						<EditableRow
							key={item.id}
							item={item}
							id={item.id}
							hoveredBtn={hoveredBtn}
							handleEnterKey={handleEnterKey}
							handleInputChange={handleInputChange}
							handleAddRow={handleAddRow}
							handleDeleteRow={handleDeleteRow}
							setHoveredBtn={setHoveredBtn}
							updateFn={updateFn}
						/>
					))
				)}
			</div>
		</div>
	)
}
