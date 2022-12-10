import React from 'react';
import s from './Chart.module.css';
import { Colums } from './Colums/Colums';
import { DayBtn } from './DayBtn/DayBtn';

interface IChart {
  chartData: Array<{
    nameDay: string,
    height: number,
    backgroundColor: string
  }>;
}

export const Chart = ({ chartData }: IChart) => {  
  return (
    <>
      <div className={s.top_block}>
        <ul className={`list-reset ${s.top_list}`}>
          {chartData.map(item => <Colums key={item.nameDay} height={item.height} backgroundColor={item.backgroundColor} />)}
        </ul>
      </div>
      <div className={s.bottom_block}>
        {chartData.map((item, index) => <DayBtn key={item.nameDay} index={index} nameDay={item.nameDay}  />)}
      </div>
    </>
  );
};
