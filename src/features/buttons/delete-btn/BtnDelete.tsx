import React, { FC } from 'react'
import DeleteteIco from '../../../app/assets/trash-ico.svg'
import styles from './BtnDelete.module.scss'

const BtnDelete: FC<any> = ({ deleteRow }) => {
	return <DeleteteIco className={styles.btn} onClick={() => deleteRow()} />
}

export default BtnDelete
