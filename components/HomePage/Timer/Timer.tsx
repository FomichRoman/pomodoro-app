import React from 'react';
import { useTimer } from '../../../hooks/useTimer';
import s from './Timer.module.css';
import { TimerStatus } from '@redux/tasks/action';
import { TimerMenu } from './TimerMenu/TimerMenu';
import { TimerWatch } from './TimerWatch/TimerWatch';
import { TimerTask } from './TimerTask/TimerTask';

export const Timer = () => {
      const { 
        minutes,
        seconds,
        styleMenu, 
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
      console.log(pause)
  return (
    <div className={s.timer}>
      <TimerMenu task={task} styleMenu={styleMenu} text={text} count={count} />
      <div className={s.bottom}>
        <TimerWatch minutes={minutes} seconds={seconds} decMinute={decMinute} incMinute={incMinute} />
        <TimerTask task={task} text={text} />
        <div className={s.btn_wrap}>
          {task ? (
               task.timerStatus === TimerStatus.OFF ? (
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
          ) : (pause) ? (
            <button onClick={finishPause} className={`btn-reset btn ${s.btn_start}`}>
              Пропустить
            </button>
          ) : (
            <button onClick={startTimer} className={`btn-reset btn ${s.btn_start}`} disabled>
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
