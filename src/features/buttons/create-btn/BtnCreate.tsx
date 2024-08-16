import React, { FC } from 'react'
import CreateIco from '../../../app/assets/add-row-ico.svg'
import styles from './BtnCreate.module.scss'
const BtnCreate: FC<any> = ({ createRow, parentID }) => {
	return (
		<CreateIco className={styles.btn} onClick={() => createRow(parentID)} />
	)
}

export default BtnCreate
