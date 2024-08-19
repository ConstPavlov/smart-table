import axios from '../../../app/axios/axios'
import { setToLS } from '../setToLS'
import { geIDFromLS } from '../getFromLS'

export const checkAndFetchTableId = async (): Promise<string | null> => {
	let idTab = String(geIDFromLS('idTable'))
	console.log('idTab из LocalStorage:', idTab)

	if (!idTab || idTab === 'null') {
		try {
			const response = await axios.post('/v1/outlay-rows/entity/create')
			const newIdTable = response.data.id
			console.log('Новый idTable создан:', newIdTable)

			setToLS('idTable', newIdTable)
			idTab = newIdTable
		} catch (error: any) {
			console.error('Ошибка создания idTable:', error)
			return null
		}
	}

	console.log('Возвращаем idTable:', idTab)
	return idTab
}
