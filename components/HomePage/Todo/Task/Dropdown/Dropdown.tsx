import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decPriorityThunk, incPriorityThunk, removeTaskThunk } from '@redux/tasks/thunk';
import s from './Dropdown.module.css';

interface IDrop {
  id: number;
  done: boolean;
  editHandlerIn: () => void;
}

export const Dropdown = ({ id, done, editHandlerIn }: IDrop) => {
  const dispatch = useDispatch();
  const [drop, setDrop] = useState(false);
  const [Y, setY] = useState(0);
  const [X, setX] = useState(0);

  //Кнопка открытия дропа

  const dropHandler = () => {
    if (done === false) {
      setDrop((prev) => !prev);
    }
  };

  const dropHandlerOut = () => {
    setDrop((prev) => !prev);
  };

  const dropHandlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setY(event.clientY - 152);
    setX(event.clientX + 25);
  };

  //Увеличить важность задачи

  const incPriority = () => {
    dispatch<any>(incPriorityThunk(id));
  };

  //Ументшить важность задачи

  const decPriority = () => {
    dispatch<any>(decPriorityThunk(id));
  };

  //Редактировать таску
  //editHandlerIn

  //Удалить таску
  const removeHandler = () => {
    dispatch<any>(removeTaskThunk(id));
  };

  const deleteHandler = () => {
    dispatch<any>(removeTaskThunk(id));
  };

  const btnStyle = () => {
    if (done === false) {
      return { cursor: 'default' };
    }
  };

  return (
    <div className={s.drop}>
      {done === false ? (
        <button className={`btn-reset ${s.drop_btn}`} onFocus={dropHandler} onMouseDown={dropHandlerClick}>
          <svg width='26' height='6' viewBox='0 0 26 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='3' cy='3' r='3' />
            <circle cx='13' cy='3' r='3' />
            <circle cx='23' cy='3' r='3' />
          </svg>
        </button>
      ) : (
        <button className={`btn-reset ${s.drop_btn} ${s.drop_btn_dis}`} onClick={deleteHandler}>
          <svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' version='1.1' viewBox='0 0 19 19'>
            <g transform='scale(1.2)'>
              <circle fill='#f44336' cx='8' cy='8' r='7' />
              <rect fill='#ffffff' width='2' height='10' x='-.98' y='-16.29' transform='rotate(135)' />
              <rect fill='#ffffff' width='2' height='10' x='-12.29' y='-5.01' transform='rotate(-135)' />
            </g>
          </svg>
        </button>
      )}

      {drop && (
        <>
          <div className={s.drop_modal} onClick={dropHandlerOut} />
          <ul style={{ top: Y, left: X }} className={`list-reset ${s.drop_list}`} onClick={dropHandlerOut}>
            <li className={s.drop_item} onClick={incPriority}>
              <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.75 5.25H8.25V8.25H5.25V9.75H8.25V12.75H9.75V9.75H12.75V8.25H9.75V5.25ZM9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z'
                  fill='#A8B64F'
                />
              </svg>
              Увеличить
            </li>

            <li className={s.drop_item} onClick={decPriority}>
              <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z'
                  fill='#C4C4C4'
                />
                <path d='M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z' fill='#C4C4C4' />
                <defs>
                  <clipPath id='clip0_34_33'>
                    <rect width='18' height='18' fill='white' />
                  </clipPath>
                </defs>
              </svg>
              Уменьшить
            </li>

            <li className={s.drop_item} onClick={editHandlerIn}>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.545 4.765L9.235 5.455L2.44 12.25H1.75V11.56L8.545 4.765ZM11.245 0.25C11.0575 0.25 10.8625 0.325 10.72 0.4675L9.3475 1.84L12.16 4.6525L13.5325 3.28C13.825 2.9875 13.825 2.515 13.5325 2.2225L11.7775 0.4675C11.6275 0.3175 11.44 0.25 11.245 0.25ZM8.545 2.6425L0.25 10.9375V13.75H3.0625L11.3575 5.455L8.545 2.6425Z'
                  fill='#A8B64F'
                />
              </svg>
              Редактировать
            </li>

            <li className={s.drop_item} onClick={removeHandler}>
              <svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 4.75V12.25H3V4.75H9ZM7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625L7.875 0.25ZM10.5 3.25H1.5V12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25Z'
                  fill='#A8B64F'
                />
              </svg>
              Удалить
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
