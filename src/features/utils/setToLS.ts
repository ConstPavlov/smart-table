export const setToLS = (keyObj: string, data: any) => {
	const jsonObj = JSON.stringify(data)
	localStorage.setItem(keyObj, jsonObj)
}
