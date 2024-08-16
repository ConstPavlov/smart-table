import React from 'react'
import MyInput from 'src/shared/input/MyInput'
import BtnCreate from '../buttons/create-btn/BtnCreate'
import BtnDelete from '../buttons/delete-btn/BtnDelete'
import { EditableRowProps } from '../editable-row/editable-interface'
import styles from './EditingRow.module.scss'

const EditableRow: React.FC<EditableRowProps> = ({
	item,
	id,
	hoveredBtn,
	handleEnterKey,
	handleInputChange,
	handleAddRow,
	handleDeleteRow,
	setHoveredBtn,
	updateFn
}) => {
	return (
		<div className={styles.info} key={item.id}>
			<div className={styles.info__row} onDoubleClick={() => updateFn(item.id)}>
				{/* Новый контейнер для группировки */}
				<div className={styles.info__leftSide}>
					<div className={styles.btns_wrap}>
						{!item.isEditing && (
							<div
								className={styles.btns}
								onMouseEnter={() => setHoveredBtn(item.id)}
								onMouseLeave={() => setHoveredBtn(null)}
							>
								<BtnCreate
									createRow={() => handleAddRow(item.id)}
									parentId={item.id}
								/>

								<BtnDelete
									deleteRow={() => handleDeleteRow(item.id)}
									hoverClass={hoveredBtn === item.id ? styles.hovered : ''}
								/>
							</div>
						)}
					</div>

					{item.isEditing ? (
						<MyInput
							id={item.id}
							placeholder='Наименование'
							value={item.rowName}
							onChange={(e: any) =>
								handleInputChange(item.id, 'rowName', e.target.value)
							}
							onKeyDown={(event: any) => handleEnterKey(event, item.id)}
						/>
					) : (
						<span>{item.rowName}</span>
					)}
				</div>
				<div className={styles.info__rightSide}>
					{item.isEditing ? (
						<>
							<MyInput
								id={item.id}
								value={Number(item.salary)}
								type='number'
								onChange={(e: any) =>
									handleInputChange(
										item.id,
										'salary',
										parseFloat(e.target.value)
									)
								}
								onKeyDown={(event: any) => handleEnterKey(event, item.id)}
							/>
							<MyInput
								id={item.id}
								value={Number(item.equipmentCosts)}
								type='number'
								onChange={(e) =>
									handleInputChange(
										item.id,
										'equipmentCosts',
										Number(e.target.value)
									)
								}
								onKeyDown={(event) => handleEnterKey(event, item.id)}
							/>
							<MyInput
								id={item.id}
								value={item.overheads}
								type='number'
								onChange={(e) =>
									handleInputChange(
										item.id,
										'overheads',
										parseFloat(e.target.value)
									)
								}
								onKeyDown={(event) => handleEnterKey(event, item.id)}
							/>
							<MyInput
								id={item.id}
								value={item.estimatedProfit}
								type='number'
								onChange={(e) =>
									handleInputChange(
										item.id,
										'estimatedProfit',
										parseFloat(e.target.value)
									)
								}
								onKeyDown={(event) => handleEnterKey(event, item.id)}
							/>
						</>
					) : (
						<>
							<span>{item.salary}</span>
							<span>{item.equipmentCosts}</span>
							<span>{item.overheads}</span>
							<span>{item.estimatedProfit}</span>
						</>
					)}
				</div>
			</div>

			{/* Рекурсивное рендеринг дочерних элементов */}
			{item.child && item.child.length > 0 && (
				<div className={styles.children}>
					{item.child.map((childItem) => (
						<EditableRow
							key={childItem.id}
							item={childItem}
							id={childItem.id}
							updateFn={updateFn}
							hoveredBtn={hoveredBtn}
							handleEnterKey={handleEnterKey}
							handleInputChange={handleInputChange}
							handleAddRow={handleAddRow}
							handleDeleteRow={handleDeleteRow}
							setHoveredBtn={setHoveredBtn}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default EditableRow
