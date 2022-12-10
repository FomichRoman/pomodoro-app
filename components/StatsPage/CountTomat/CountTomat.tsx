import React, { useState } from 'react';
import s from './CountTomat.module.css';
import Tomato from '@icons/tomato.svg'
import { Ending } from 'utils/ending';

interface ISumTomat {
  countTomatData: number
}

export const CountTomat = ({ countTomatData }: ISumTomat) => {
  const text = Ending(countTomatData)
    
  return (
    <div className={s.count}>
      <div className={s.count_top}>
        <Tomato />
        x {countTomatData}
      </div>
      <div className={s.count_bottom}>
        {countTomatData} {text}
      </div>
    </div>
  );
};
