import React from 'react'
import TimerInc from '@icons/timer-inc.svg'
import TimerDec from '@icons/timer-dec.svg'
import s from './TimerWatch.module.css';

interface ITimerWatch {
  minutes: number | string,
  seconds: number | string,
  decMinute: () => void,
  incMinute: () => void
}

export const TimerWatch = ({ minutes, seconds, decMinute, incMinute }: ITimerWatch) => {
  return (
    <span className={s.watch}>
      <button onClick={decMinute} className={`btn-reset ${s.watch_btn} ${s.watch_btn_dec}`}>
        <TimerDec />
      </button>
      <span>{`${minutes}:${seconds}`}</span>
      <button onClick={incMinute} className={`btn-reset ${s.watch_btn}`}>
        <TimerInc />
      </button>
    </span>
  )
}
