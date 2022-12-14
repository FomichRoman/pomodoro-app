import { statusTimer } from './../redux/timer/actions';
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/redusers";
import { saveTaskId } from "../redux/task/actions";
import { ITask } from "../redux/task/reduser";
import { defoultTasks, ITasks, TimerStatus } from "../redux/tasks/action";
import { doneTaskThunk, pauseCountThunk, pauseTimeThunk, timerStatusTaskThunk, updateTimeThunk } from "../redux/tasks/thunk";
import { ITimerStatus } from '@redux/timer/reduser';

export function useTimer() {
  const dispatch = useDispatch();
  const tasks = useSelector<RootState, ITasks[]>((state) => state.tasks);
  const { id } = useSelector<RootState, ITask>((state) => state.task);
  const { status } = useSelector<RootState, ITimerStatus>((state) => state.timer);
  const timerId = useRef<any>(null)
  const [pause, setPause] = useState<any>(null)

  let { text, count, done, timeLeft } = defoultTasks('Название задачи');

  let task = tasks.find((item) => item.id == id);
  let pauseTime = tasks.filter((item) => item.done === true).length;

  let minutes
  let seconds
  let styleMenu;

  const incMinute = () => {
    dispatch<any>(updateTimeThunk(id, 60));
  };

  const decMinute = () => {
    dispatch<any>(updateTimeThunk(id, -60));
  };

  function startTimer() {
    if (status === TimerStatus.OFF || status === TimerStatus.POMODORO_PAUSE) {
      clearInterval(timerId.current)
      timerId.current = setInterval(() => dispatch<any>(updateTimeThunk(id, -1)), 1000);
      dispatch<any>(timerStatusTaskThunk(id, TimerStatus.POMODORO_ON))
      dispatch(statusTimer(TimerStatus.POMODORO_ON))
    } else {
      alert('Таймер уже запущен')
    }
    };

  function pauseTimer() {
      clearInterval(timerId.current)
      dispatch<any>(pauseCountThunk(id))
      timerId.current = setInterval(() => { dispatch<any>(pauseTimeThunk(id)) }, 1000);
      dispatch<any>(timerStatusTaskThunk(id, TimerStatus.POMODORO_PAUSE))
      dispatch(statusTimer(TimerStatus.POMODORO_PAUSE))
  }
 
   function stopTimer() {
    clearInterval(timerId.current)
    dispatch<any>(timerStatusTaskThunk(id, TimerStatus.OFF))
    dispatch(statusTimer(TimerStatus.OFF))
   }

  function finishTimer() {
    dispatch<any>(doneTaskThunk(id, true))
    dispatch<any>(timerStatusTaskThunk(id, TimerStatus.OFF))
    clearInterval(timerId.current)
    dispatch(saveTaskId(null))
    startPauseTime()
  }

  function startPauseTime() {
    pauseTime % 4 ? setPause(10) : setPause(5);
    timerId.current = setInterval(() => {
      setPause((prev: number) => prev - 1)
    }, 1000);
  }

  if (pause === 0) {
    clearInterval(timerId.current)
    setPause(null)
    dispatch(statusTimer(TimerStatus.OFF))
  }

  function finishPause() {
    clearInterval(timerId.current)
    setPause(null)
    dispatch(statusTimer(TimerStatus.OFF))
  }

  if (pause) {
    minutes = Math.floor(pause / 60)
    seconds = pause - minutes * 60
    styleMenu = { backgroundColor: '#138808' }
    text = "Пауза"
  } else if (task) {
    minutes = Math.floor(task.timeLeft / 60)
    seconds = task.timeLeft - minutes * 60
    styleMenu = { backgroundColor: '#dc3e22' }
  } else {
    minutes = Math.floor(timeLeft / 60)
    seconds = timeLeft - minutes * 60
  }

  if (task?.timeLeft === 0) {
      finishTimer()
  }

  minutes < 10 ? minutes = `0${minutes}` : null
  seconds < 10 ? seconds = `0${seconds}` : null

  return {
    minutes,
    seconds,
    styleMenu,
    statusTimer,
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
    finishPause,
  }
}
