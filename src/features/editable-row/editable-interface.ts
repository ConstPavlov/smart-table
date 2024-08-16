import { TreeResponse } from '../types/types'

export interface IDataItem extends TreeResponse {
	isEditing: boolean
	child: IDataItem[]
	parentId: number | null // Новое поле
	machine: number
}

export type EditableField = Exclude<keyof IDataItem, 'isEditing'>

export interface EditableRowProps {
	item: IDataItem
	id?: number
	hoveredBtn: number | null
	handleEnterKey: (
		event: React.KeyboardEvent<HTMLInputElement>,
		id: number
	) => void
	handleInputChange: <K extends EditableField>(
		id: number,
		field: K,
		value: IDataItem[K]
	) => void
	handleAddRow: (parentId: number | null) => void
	handleDeleteRow: (id: number) => void
	setHoveredBtn: React.Dispatch<React.SetStateAction<number | null>>
	updateFn: (id: number) => void
}
