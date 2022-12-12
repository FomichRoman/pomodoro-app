import { ITasks } from '@redux/tasks/action'
import React from 'react'
import s from './TimerTask.module.css';

interface ITimerTask {
  task?: ITasks,
  text: string
}

export const TimerTask = ({ task, text}: ITimerTask) => {
  return (
    <div className={s.desc}>
      Задача 1 - <span>{task ? task.text : text}</span>
    </div>
  )
}
