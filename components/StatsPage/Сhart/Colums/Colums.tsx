import React from 'react'
import s from './Colums.module.css'

interface IColums {
  height: number,
  backgroundColor: string
}

export const Colums = ({height , backgroundColor}: IColums) => {
  return (
    <li className={s.top_item}>
      <div className={s.colums} style={{height: height, backgroundColor: backgroundColor}} />
    </li>
  )
}
