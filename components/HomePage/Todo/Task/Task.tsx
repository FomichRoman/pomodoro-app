import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveTaskId } from '@redux/task/actions';
import { editTaskThunk } from '@redux/tasks/thunk';
import s from './Task.module.css';
import { Dropdown } from './Dropdown/Dropdown';
import { Modal } from 'shared/Modal/Modal';

interface IItem {
  id: number;
  text: string;
  count: number;
  done: boolean;
}

export const Task = ({ id, text, count, done }: IItem) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(false);
  const input = useRef<any>(null);

  //Диспатч в таймер
  const editHandlerClick = () => {
    done === false ? dispatch(saveTaskId(id)) : null;
  };

  const editHandlerOut = () => {
    setEdit(false);
    if (value.trim().length !== 0) {
      dispatch<any>(editTaskThunk(id, value));
      setValue('');
    } else {
      alert('Введите название задачи');
    }
  };

  const editHandlerIn = () => {
    if (done === false) {
      setEdit(true);
      setTimeout(() => {
        input.current.focus();
      }, 10);
    }
  };

  const doneStyle = (done: boolean) => {
    if (done) {
      return { backgroundColor: 'rgb(207 241 226)', color: 'black' };
    }
  };

  return (
    <li className={s.task} onClick={editHandlerClick} onDoubleClick={editHandlerIn}>
      <div style={doneStyle(done)} className={s.count}>
        {count}
      </div>
      {!edit ? (
        <span className={s.text}>{text}</span>
      ) : (
        <>
          <Modal modalHadler={editHandlerOut} />
          <input ref={input} value={value} onChange={(event) => setValue(event.target.value)} type='text' className={s.input} />
        </>
      )}

      <Dropdown id={id} done={done} editHandlerIn={editHandlerIn} />
    </li>
  );
};
