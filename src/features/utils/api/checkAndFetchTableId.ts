import axios from '../../../app/axios/axios'
import { setToLS } from '../setToLS'
import { geIDFromLS } from '../getFromLS'

// Асинхронная функция для проверки и создания idTable
export const checkAndFetchTableId = async (): Promise<string | null> => {
	let idTab = String(geIDFromLS('idTable'))
	console.log('idTab тот что в LS', idTab)

	if (!idTab) {
		try {
			const response = await axios.post('/v1/outlay-rows/entity/create')
			const newIdTable = response.data.id

			setToLS('idTable', newIdTable)
			idTab = newIdTable
		} catch (error: any) {
			throw new Error(error)
		}
	}

	return idTab
}
