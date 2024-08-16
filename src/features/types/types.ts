export interface TreeResponse {
	child?: TreeResponse[]
	equipmentCosts: number
	estimatedProfit: number
	id: number
	machineOperatorSalary?: number
	mainCosts?: number
	materials?: number
	mimExploitation?: number
	overheads: number
	rowName: string
	salary: number
	supportCosts?: number
	total?: number
}
