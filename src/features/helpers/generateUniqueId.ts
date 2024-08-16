export const generateUniqueId = (existingIds: Set<number>): number => {
	let newId = 0
	while (existingIds.has(newId)) {
		newId++
	}
	return newId
}
