import React, { KeyboardEventHandler } from 'react'
import BtnCreate from 'src/features/buttons/create-btn/BtnCreate'
import BtnDelete from 'src/features/buttons/delete-btn/BtnDelete'
import InfoItem from 'src/features/info/InfoItem'
import MyInput from 'src/shared/input/MyInput'

import styles from './Smp.module.scss'

interface IDataItem {
	id: number
	name: string
	salary: number
	equipment: number
	expenses: number
	profits: number
	isEditing: boolean
}

type EditableField = Exclude<keyof IDataItem, 'isEditing'>

const initialData: IDataItem[] = [
	{
		id: 0,
		name: 'Южная строительная площадка',
		salary: 20348,
		equipment: 1750,
		expenses: 108.07,
		profits: 1209122.5,
		isEditing: false
	}
]
export default function Smp() {
	const [data, setData] = React.useState<IDataItem[]>(initialData)
	const [hoveredBtn, setHoveredBtn] = React.useState<number | null>(null)

	const handleAddRow = () => {
		const newRow = {
			id: data.length + 1,
			name: '',
			salary: 0,
			equipment: 0,
			expenses: 0,
			profits: 0,
			isEditing: true
		}
		setData((prev) => [...prev, newRow])
	}

	const handleDeleteRow = (id: number) => {
		const withoutCurrent = data.filter((el) => el.id !== id)

		setData(withoutCurrent)
	}

	const handleInputChange = <K extends EditableField>(
		index: number,
		field: K,
		value: IDataItem[K]
	) => {
		const updatedData = [...data]
		updatedData[index][field] = value
		setData(updatedData)
	}

	const handleEnterKey = (
		event: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		const { key } = event
		if (key === 'Enter') {
			const updatedData = [...data]
			updatedData[index].isEditing = false
			setData(updatedData)
		}
	}

	React.useEffect(() => {}, [])
	return (
		<div className={styles.wrapper}>
			<div className={styles.head}>
				<h1 className={styles.title}>Строительно-монтажные работы</h1>
			</div>

			<div className={styles.smp}>
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

				{data.map((item, index) => (
					<div className={styles.info} key={index}>
						<div className={styles.info__leftSide}>
							<div className={styles.btns_wrap}>
								{!item.isEditing && (
									<div
										className={styles.btns}
										onMouseEnter={() => setHoveredBtn(item.id)}
										onMouseLeave={() => setHoveredBtn(null)}
									>
										<BtnCreate createRow={handleAddRow} />
										{hoveredBtn === item.id && (
											<BtnDelete deleteRow={() => handleDeleteRow(item.id)} />
										)}
									</div>
								)}
							</div>

							{item.isEditing ? (
								<MyInput
									placeholder='Наименование'
									value={item.name || ''}
									onChange={(e: any) =>
										handleInputChange(index, 'name', e.target.value)
									}
								/>
							) : (
								<span>{item.name}</span>
							)}
						</div>
						<div className={styles.info__rightSide}>
							{item.isEditing ? (
								<>
									<MyInput
										value={Number(item.salary)}
										onChange={(e: any) =>
											handleInputChange(
												index,
												'salary',
												parseFloat(e.target.value)
											)
										}
										onKeyDown={(event: any) => handleEnterKey(event, index)}
									/>
									<MyInput
										value={Number(item.equipment)}
										onChange={(e) =>
											handleInputChange(
												index,
												'equipment',
												Number(e.target.value)
											)
										}
										onKeyDown={(event) => handleEnterKey(event, index)}
									/>
									<MyInput
										value={item.expenses}
										onChange={(e) =>
											handleInputChange(
												index,
												'expenses',
												parseFloat(e.target.value)
											)
										}
										onKeyDown={(event) => handleEnterKey(event, index)}
									/>
									<MyInput
										value={item.profits}
										onChange={(e) =>
											handleInputChange(
												index,
												'profits',
												parseFloat(e.target.value)
											)
										}
										onKeyDown={(event) => handleEnterKey(event, index)}
									/>
								</>
							) : (
								<>
									<span>{item.salary}</span>
									<span>{item.equipment}</span>
									<span>{item.expenses}</span>
									<span>{item.profits}</span>
								</>
							)}
						</div>
					</div>
				))}
				{/* <div className={styles.addRow}>
					<button onClick={handleAddRow}>Добавить новую строку</button>
				</div> */}
			</div>
		</div>
	)
}
