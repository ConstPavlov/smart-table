import React from 'react'
import styles from './LabelsTable.module.scss'

const LabelsTable = () => {
	return (
		<div className={styles.labels}>
			<div className={styles.labels__leftSide}>
				<span>Уровень</span>
				<span className={styles.works}>Наименование работ</span>
			</div>
			<div className={styles.labels__rightSide}>
				<span>Основная з/п</span>
				<span>Оборудование</span>
				<span>Накладные расходы</span>
				<span>Сметная прибыль</span>
			</div>
		</div>
	)
}

export default LabelsTable
