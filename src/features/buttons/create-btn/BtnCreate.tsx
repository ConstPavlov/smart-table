import React, { FC } from 'react'
import CreateIco from '../../../app/assets/add-row-ico.svg'
import styles from './BtnCreate.module.scss'
const BtnCreate: FC<any> = ({ createRow }) => {
	return <CreateIco className={styles.btn} onClick={() => createRow()} />
}

export default BtnCreate
