import { IDataItem } from 'src/features/editable-row/editable-interface'
import {
	OutlayRowRequest,
	OutlayRowUpdateRequest
} from 'src/widgets/smp/smp-interface'

export interface ITable {
	data: IDataItem[]
	idSet: Set<number>
	status: Status
	error: string | null
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export type FetchCreateParams = {
	idTable: string
	newRow: OutlayRowRequest
}

export type FetchUpdateParams = {
	idTable: string
	updatePayload: OutlayRowUpdateRequest
	idUpd: string
}
