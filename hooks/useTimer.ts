import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/redusers";
import { saveTaskId } from "../redux/task/actions";
import { ITask } from "../redux/task/reduser";
import { defoultTasks, ITasks, TimerStatus } from "../redux/tasks/action";
import { doneTaskThunk, pauseCountThunk, pauseTimeThunk, timerStatusTaskThunk, updateTimeThunk } from "../redux/tasks/thunk";

export function useTimer() {
  const dispatch = useDispatch();
  const tasks = useSelector<RootState, ITasks[]>((state) => state.tasks);
  const { id } = useSelector<RootState, ITask>((state) => state.task);
  const timerId = useRef<any>(null)
  const [statusTimer, setStatusTimer] = useState(TimerStatus.OFF)
  const [pause, setPause] = useState(0)

  let { text, count, done, timeLeft } = defoultTasks('Название задачи');

  let task = tasks.find((item) => item.id == id);
  let pauseTime = tasks.filter((item) => item.done === true).length;

  let minutes
  let seconds
  let timePause: any;

  if (minutes === 0 && seconds === 0) {
    doneTaskThunk(id, true)
    pauseTime % 4 ? setPause(900) : setPause(300);
    timerId.current = setInterval(() => {
      setPause(prev => prev - 1)
    }, 1000);
  }

  const incMinute = () => {
    dispatch<any>(updateTimeThunk(id, 60));
  };

  const decMinute = () => {
    dispatch<any>(updateTimeThunk(id, -60));
  };

  function startTimer() {
    if (statusTimer === TimerStatus.OFF || statusTimer === TimerStatus.POMODORO_PAUSE) {
      clearInterval(timerId.current)
      timerId.current = setInterval(() => dispatch<any>(updateTimeThunk(id, -1)), 1000);
      dispatch<any>(timerStatusTaskThunk(id, TimerStatus.POMODORO_ON))
      setStatusTimer(TimerStatus.POMODORO_ON)
    } else {
      alert('Таймер уже запущен')
    }
    };

  function pauseTimer() {
      clearInterval(timerId.current)
      dispatch<any>(pauseCountThunk(id))
      timerId.current = setInterval(() => { dispatch<any>(pauseTimeThunk(id)) }, 1000);
      dispatch<any>(timerStatusTaskThunk(id, TimerStatus.POMODORO_PAUSE))
      setStatusTimer(TimerStatus.POMODORO_PAUSE)
  }
 
   function stopTimer() {
    clearInterval(timerId.current)
    dispatch<any>(timerStatusTaskThunk(id, TimerStatus.OFF))
    setStatusTimer(TimerStatus.OFF)
   }

    function finishTimer() {
      dispatch<any>(doneTaskThunk(id, true))
      dispatch<any>(timerStatusTaskThunk(id, TimerStatus.OFF))
      clearInterval(timerId.current)
      pauseTime % 4 ? setPause(900) : setPause(300);
      timerId.current = setInterval(() => {
        setPause(prev => prev - 1)
      }, 1000);
      setStatusTimer(TimerStatus.OFF)
    }

    function finishPause() {
      clearInterval(timerId.current)
      setPause(0)
      dispatch(saveTaskId(null))
    }


    if (pause) {
      minutes = Math.floor(pause / 60)
      seconds = pause - minutes * 60
    } else if (task) {
      minutes = Math.floor(task.timeLeft / 60)
      seconds = task.timeLeft - minutes * 60
    } else {
      minutes = Math.floor(timeLeft / 60)
      seconds = timeLeft - minutes * 60
    }

    minutes < 10 ? minutes = `0${minutes}` : null
    seconds < 10 ? seconds = `0${seconds}` : null

  return {
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
  }
}
