import React from 'react';
import s from './CountTime.module.css';

interface ITime {
  week: string;
  timeDay: () => {
    minutes: number;
    nameDay: any;
  };
}

export const CountTime = ({ week, timeDay }: ITime) => {
  const { minutes, nameDay } = timeDay();
  return (
    <div className={s.wrap}>
      <h2 className={s.title}>{!nameDay ? week : nameDay}</h2>
      <p className={s.desc}>{`Вы работали над задачами в течение ${minutes} минуты`}</p>
    </div>
  );
};
