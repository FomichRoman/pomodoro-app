import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decPriorityThunk, incPriorityThunk, removeTaskThunk } from '@redux/tasks/thunk';
import s from './Dropdown.module.css';
import DropOpenSvg from '@icons/drop-open.svg'
import DropDoneSvg from '@icons/drop-done.svg'
import DropIncreaseSvg from '@icons/drop-increase.svg'
import DropReduceSvg from '@icons/drop-reduce.svg'
import DropEditSvg from '@icons/drop-edit.svg'
import DropRemoveSvg from '@icons/drop-remove.svg'
import { Modal } from 'shared/Modal/Modal';

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
  const windowInnerWidth = window.innerWidth

  const dropHandler = () => {
    if (done === false) {
      setDrop((prev) => !prev);
    }
  };

  const dropHandlerOut = () => {
    setDrop((prev) => !prev);
  };

  let dropHandlerClick
  if (windowInnerWidth > 650) {
    dropHandlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setY(event.clientY - 152);
      setX(event.clientX + 25);
    };
  } else {
    dropHandlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setY(event.clientY - 152);
      setX(event.clientX - 180);
    };
  }


  const incPriority = () => {
    dispatch<any>(incPriorityThunk(id));
  };

  const decPriority = () => {
    dispatch<any>(decPriorityThunk(id));
  };

  const removeHandler = () => {
    dispatch<any>(removeTaskThunk(id));
  };

  const deleteHandler = () => {
    dispatch<any>(removeTaskThunk(id));
  };

  return (
    <div className={s.drop}>
      {done === false ? (
        <button className={`btn-reset ${s.drop_btn}`} onFocus={dropHandler} onMouseDown={dropHandlerClick}>
          <DropOpenSvg />
        </button>
      ) : (
        <button className={`btn-reset ${s.drop_btn} ${s.drop_btn_dis}`} onClick={deleteHandler}>
          <DropDoneSvg />
        </button>
      )}
      {drop && (
        <>
          <Modal modalHadler={dropHandlerOut} />
          <ul style={{ top: Y, left: X }} className={`list-reset ${s.drop_list}`} onClick={dropHandlerOut}>
            <li className={s.drop_item} onClick={incPriority}>
              <DropIncreaseSvg />
              Увеличить
            </li>
            <li className={s.drop_item} onClick={decPriority}>
              <DropReduceSvg />
              Уменьшить
            </li>
            <li className={s.drop_item} onClick={editHandlerIn}>
              <DropEditSvg />
              Редактировать
            </li>
            <li className={s.drop_item} onClick={removeHandler}>
              <DropRemoveSvg />
              Удалить
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
