import React from 'react';
import { useTimer } from '../../../hooks/useTimer';
import s from './Timer.module.css';
import TimerInc from '@icons/timer-inc.svg'
import TimerDec from '@icons/timer-dec.svg'
import { TimerStatus } from '@redux/tasks/action';

export const Timer = () => {
  const { 
    minutes,
    seconds, 
    pause, 
    task, 
    text, 
    count, 
    incMinute,
    decMinute, 
    startTimer, 
    pauseTimer, 
    stopTimer, 
    finishTimer,
    finishPause 
  } = useTimer();

  const topStyle = (task: any) => {
    if (task) {
      if (task.timerStatus === TimerStatus.POMODORO_ON) {
        return { backgroundColor: '#dc3e22' };
      } else if (task.timerStatus === TimerStatus.POMODORO_PAUSE) {
        return { backgroundColor: '#dc3e22' };
      }
    }
  };

  console.log(task?.timerStatus)

  return (
    <div className={s.timer}>
      <div style={topStyle(task)} className={s.top}>
        <h3 className={s.title}>{task ? task.text : text}</h3>
        <span className={s.span}>Помидор {task ? task.count : count}</span>
      </div>
      <div className={s.bottom}>
        <span className={s.watch}>
          <button onClick={decMinute} className={`btn-reset ${s.watch_btn} ${s.watch_btn_dec}`}>
            <TimerDec />
          </button>
          <span>{`${minutes}:${seconds}`}</span>
          <button onClick={incMinute} className={`btn-reset ${s.watch_btn}`}>
            <TimerInc />
          </button>
        </span>
        <div className={s.desc}>
          Задача 1 - <span>{task ? task.text : text}</span>
        </div>
        <div className={s.btn_wrap}>
          {task ? (
              pause ? (
                <button onClick={finishPause} className={`btn-reset btn ${s.btn_start}`}>
                  Пропустить
                </button>
              ) : task.timerStatus === TimerStatus.OFF ? (
              <button onClick={startTimer} className={`btn-reset btn ${s.btn_start}`}>
                Старт
              </button>
            ) : task.timerStatus === TimerStatus.POMODORO_ON ? (
              <button onClick={pauseTimer} className={`btn-reset btn ${s.btn_start}`}>
                Пауза
              </button>
            ) : task.timerStatus === TimerStatus.POMODORO_PAUSE ? (
              <button onClick={startTimer} className={`btn-reset btn ${s.btn_start}`}>
                Продолжить
              </button>
            ) : null
          ) : (
            <button onClick={startTimer} className={`btn-reset btn ${s.btn_start}`}>
              Старт
            </button>
          )}
          {task ? (
            task.timerStatus === TimerStatus.OFF ? (
              <button onClick={stopTimer} className={`btn-reset ${s.btn_stop} ${s.btn_disabled}`} disabled>
                Стоп
              </button>
            ) : task.timerStatus === TimerStatus.POMODORO_ON ? (
              <button onClick={finishTimer} className={`btn-reset ${s.btn_stop}`}>
                Сделано
              </button>
            ) : task.timerStatus === TimerStatus.POMODORO_PAUSE ? (
              <button onClick={stopTimer} className={`btn-reset ${s.btn_stop}`}>
                Стоп
              </button>
            ) : null
          ) : (
            <button onClick={stopTimer} className={`btn-reset ${s.btn_stop} ${s.btn_disabled}`} disabled>
              Стоп
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
