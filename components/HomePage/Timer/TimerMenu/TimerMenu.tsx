import { ITasks, TimerStatus } from '@redux/tasks/action';
import React from 'react'
import s from './TimerMenu.module.css';

interface ITimerMenu {
  task?: ITasks,
  text: string,
  count: number
}

export const TimerMenu = ({ task, text, count }: ITimerMenu) => {
  const topStyle = (task?: ITasks) => {
    if (task) {
      if (task.timerStatus === TimerStatus.POMODORO_ON) {
        return { backgroundColor: '#dc3e22' };
      } else if (task.timerStatus === TimerStatus.POMODORO_PAUSE) {
        return { backgroundColor: '#dc3e22' };
      }
    }
  };
  return (
    <div style={topStyle(task)} className={s.top}>
      <h3 className={s.title}>{task ? task.text : text}</h3>
      <span className={s.span}>Помидор {task ? task.count : count}</span>
    </div>
  )
}
