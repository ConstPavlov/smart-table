import React, { FC } from 'react'
import DeleteteIco from '../../../app/assets/trash-ico.svg'
import styles from './BtnDelete.module.scss'
import clsx from 'clsx'

const BtnDelete: FC<any> = ({ deleteRow, hoverClass }) => {
	return (
		<DeleteteIco
			className={clsx(styles.btn, hoverClass)}
			onClick={() => deleteRow()}
		/>
	)
}

export default BtnDelete
