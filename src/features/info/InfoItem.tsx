import React, { FC } from 'react'

const InfoItem: FC<any> = ({ item }) => {
	return (
		<>
			<span>{item.salary}</span>
			<span>{item.equipment}</span>
			<span>{item.expenses}</span>
			<span>{item.profits}</span>
		</>
	)
}

export default InfoItem
