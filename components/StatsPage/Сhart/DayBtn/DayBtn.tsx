import React from 'react'
import { useDispatch } from 'react-redux';
import { DayWeekStats } from 'redux/stats/actions';
import s from './DayBtn.module.css';  

interface IDayBtn {
  index: number,
  nameDay: string
}

export const DayBtn = ({ index, nameDay }: IDayBtn) => {
  const dispatch = useDispatch();
  return (
    <button className={`btn-reset ${s.btn}`} onClick={() => dispatch(DayWeekStats(index))}>
      {nameDay}
    </button>
  )
}
