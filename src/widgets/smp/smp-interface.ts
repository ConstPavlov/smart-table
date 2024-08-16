export interface OutlayRowRequest {
	rowName: string
	salary: number
	equipmentCosts: number
	estimatedProfit: number
	overheads: number
	machineOperatorSalary: number
	machine: number
	mainCosts: number
	materials: number
	mimExploitation: number
	supportCosts: number
	parentId: number | null
}

export interface OutlayRowUpdateRequest {
	equipmentCosts: number
	estimatedProfit: number
	machineOperatorSalary: number
	mainCosts: number
	materials: number
	mimExploitation: number
	overheads: number
	rowName: string
	salary: number
	supportCosts: number
}
