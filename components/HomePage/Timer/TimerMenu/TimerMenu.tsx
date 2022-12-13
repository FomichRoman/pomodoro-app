import { ITasks, TimerStatus } from '@redux/tasks/action';
import React from 'react'
import s from './TimerMenu.module.css';

interface ITimerMenu {
  task?: ITasks,
  styleMenu?: {}
  text: string,
  count: number
}

export const TimerMenu = ({ task, styleMenu, text, count }: ITimerMenu) => {
  return (
    <div style={styleMenu} className={s.top}>
      <h3 className={s.title}>{task ? task.text : text}</h3>
      <span className={s.span}>Помидор {task ? task.count : count}</span>
    </div>
  )
}
