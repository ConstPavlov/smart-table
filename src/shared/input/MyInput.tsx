import React, { FC, forwardRef } from 'react'
import styles from './MyInput.module.scss'

interface MyInputProps {
	id?: number
	value: any
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
	className?: string // если className может быть передан
	placeholder?: string
	type?: string
}

const MyInput: FC<MyInputProps> = forwardRef<HTMLInputElement, MyInputProps>(
	(props, ref) => {
		const {
			id,
			className,
			onChange,
			onKeyDown,
			placeholder,
			value,
			type,
			...rest
		} = props

		return (
			<input
				id={id ? `input-${id}` : undefined}
				ref={ref}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={onChange} // Передаем событие onChange
				onKeyDown={onKeyDown} // Передаем событие onKeyDown
				className={`${styles.input} ${className || ''}`} // Если className не передан, добавляем пустую строку
				{...rest} // Остальные пропсы
			/>
		)
	}
)

export default MyInput
