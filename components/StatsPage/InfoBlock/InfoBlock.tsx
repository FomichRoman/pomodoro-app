import React from 'react';
import s from './InfoBlock.module.css';

interface IFocusBlock {
  title: string,
  backColor: string,
  data: string,
  children: React.ReactNode
}

export const InfoBlock = ({ title, backColor, data, children }: IFocusBlock) => {

  return (
    <div style={{ backgroundColor: backColor }} className={s.block}>
      <div className={s.block_wrap}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.meaning}>{data}</p>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
