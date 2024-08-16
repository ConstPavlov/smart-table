export const geIDFromLS = (key: string): number => {
	const idTable = localStorage.getItem(key)

	const idT: number = idTable ? JSON.parse(idTable) : null

	return idT
}
