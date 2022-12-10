import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useStats } from '../../../hooks/useStats';
import { Week, WeekStats } from '../../../redux/stats/actions';
import s from './Statsmenu.module.css';

interface IWeek {
  week: Week;
}

export const StatsMenu = ({ week }: IWeek) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const weekHandler = (week: Week) => {
    dispatch(WeekStats(week));
    setIsOpen(false);
  };
  return (
    <div className={s.wrap}>
      <h1 className={s.title}>Ваша активность</h1>
      <div className={s.select}>
        <button className={`btn-reset ${s.select_btn}`} onClick={() => setIsOpen((prev) => !prev)}>
          {week}
          {isOpen ? (
            <svg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M1 9L8 2L15 9' stroke='#B7280F' />
            </svg>
          ) : (
            <svg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M15 1L8 8L1 1' stroke='#B7280F' />
            </svg>
          )}
        </button>
        {isOpen && (
          <ul className={`list-reset ${s.select_list}`}>
            <li className={s.select_item} onClick={() => weekHandler(Week.CURRENT)}>
              {Week.CURRENT}
            </li>
            <li className={s.select_item} onClick={() => weekHandler(Week.PREVIOUS)}>
              {Week.PREVIOUS}
            </li>
            <li className={s.select_item} onClick={() => weekHandler(Week.PREV_PREV)}>
              {Week.PREV_PREV}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
