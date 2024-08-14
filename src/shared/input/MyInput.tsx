import React, { Dispatch, FC, forwardRef } from 'react'
import styles from './MyInput.module.scss'

// interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
// 	onChange?: any
// }

const MyInput: FC = forwardRef<HTMLInputElement, any>((props, ref) => {
	const { className, onChange, ...rest } = props

	return (
		<input
			ref={ref}
			{...rest}
			className={styles.input}
			onChange={() => onChange()}
		/>
	)
})

export default MyInput
