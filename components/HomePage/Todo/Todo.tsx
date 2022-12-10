import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/redusers';
import { ITasks } from '@redux/tasks/action';
import { Task } from './Task/Task';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import s from './Todo.module.css';
import { saveTaskThunk } from '@redux/tasks/thunk';

export const Todo = () => {
  const dispatch = useDispatch();
  const tasks = useSelector<RootState, ITasks[]>((state) => state.tasks);
  const [value, setValue] = useState('');

  const submitHandler = (event: React.FormEvent, text: string) => {
    event.preventDefault();
    if (text.trim().length !== 0) {
      dispatch<any>(saveTaskThunk(text));
      setValue('');
    } else {
      alert('Введите название задачи');
    }
  };

  return (
    <div className={s.todo}>
      <h2>Ура! Теперь можно начать работать:</h2>
      <ul className={s.list}>
        <li className={s.item}>Выберите категорию и напишите название текущей задачи</li>
        <li className={s.item}>Запустите таймер («помидор»)</li>
        <li className={s.item}>Работайте пока «помидор» не прозвонит</li>
        <li className={s.item}>Сделайте короткий перерыв (3-5 минут)</li>
        <li className={s.item}>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут)</li>
      </ul>
      <form className={s.form} onSubmit={(event) => submitHandler(event, value)}>
        <input value={value} onChange={(event) => setValue(event.target.value)} type='text' className={s.input} placeholder='Название задачи' />
        <button type='submit' className={`btn btn-reset ${s.btn}`}>
          Добавить
        </button>
      </form>
      <SimpleBar className={`${s.tasklist}`}>
        {tasks.map((item) => (
          <Task key={item.id} id={item.id} text={item.text} count={item.count} done={item.done} />
        ))}
      </SimpleBar>
    </div>
  );
};
