import React from 'react'
import style from './Sidebar.module.scss'
import IcoSidebar from '../../app/assets/sidebar-ico.svg'
import { Link } from 'react-router-dom'
import ArrowIco from '../../app/assets/sidebar-arrow-ico.svg'
export const namesAbbr = [
	'По проекту',
	'Объекты',
	'РД',
	'МТО',
	'СМР',
	'График',
	'МиМ'
]
export default function Sidebar() {
	return (
		<div className={style.sidebar}>
			<div className={style.heading}>
				<div className={style.heading__wrap}>
					<h1 className={style.title}>Название проекта</h1>
					<p className={style.subtitle}>Аббревиатура</p>
				</div>
				<ArrowIco className={style.ico} />
			</div>

			<div className={style.list}>
				{namesAbbr.map((abb, i) => (
					<div className={style.item} key={i}>
						<IcoSidebar className={style.ico} />
						<span className={style.text}>{abb}</span>
					</div>
				))}
			</div>
		</div>
	)
}
