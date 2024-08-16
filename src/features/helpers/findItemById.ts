import { OutlayRowUpdateRequest } from 'src/widgets/smp/smp-interface'
import { IDataItem } from '../editable-row/editable-interface'

// Функция для рекурсивного поиска элемента по ID
export const findItemById = (
	items: IDataItem[],
	id: number
): IDataItem | null => {
	for (const item of items) {
		if (item.id === id) {
			return item
		}
		const found = findItemById(item.child, id)
		if (found) {
			return found
		}
	}
	return null
}
