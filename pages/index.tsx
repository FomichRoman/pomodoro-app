import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../components/Header/Header';
import { Timer } from '../components/HomePage/Timer/Timer';
import { Todo } from '../components/HomePage/Todo/Todo';
import { saveAllReduxTaskThunk } from '@redux/tasks/thunk';
import s from '../styles/Home.module.css';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(saveAllReduxTaskThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Pomodoro | Главная</title>
      </Head>
      <Header link={'/stats'} span={'Статистика'} />
      <main>
        <div className={`container ${s.home__container}`}>
          <h1 className='visually-hidden'>Список задач по методу помидора</h1>
          <div className={s.wrap}>
            <Todo />
            <Timer />
          </div>
        </div>
      </main>
    </>
  );
}
