import React from 'react'
import BtnCreate from '../create-btn/BtnCreate'

import styles from './BaseButton.module.scss'

interface BaseButtonProps {
	handleAddRow: (parentId: number | null) => void
}

const BaseButton: React.FC<BaseButtonProps> = ({ handleAddRow }) => {
	return (
		<div className={styles.baseButton}>
			<BtnCreate
				createRow={() => handleAddRow(null)} // null для создания первой строки
				parentId={null} // parentId будет null для базовой строки
			/>
		</div>
	)
}

export default BaseButton
