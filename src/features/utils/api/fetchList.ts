import { TreeResponse } from 'src/features/types/types'
import axios from '../../../app/axios/axios'
import { checkAndFetchTableId } from './checkAndFetchTableId'

export const fetchList = async () => {
	const idTab = await checkAndFetchTableId()
	// if (!idTab) {
	// 	throw new Error('Failed to fetch or create idTable.')
	// }
	if (idTab) {
		try {
			const { data } = await axios.get<TreeResponse[]>(
				`/v1/outlay-rows/entity/${idTab}/row/list`
			)
			return data
		} catch (error: any) {
			console.log(error)
			return []
		}
	}
}
