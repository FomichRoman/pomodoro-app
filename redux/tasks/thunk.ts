import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { addTask, decPriorityTask, defoultTasks, doneTask, editTask, incPriorityTask, ITasks, PauseTimeStats, removeTask, saveTasks, statusTimerTask, TimerStatus, updateTimeTask } from "./action";

export const saveAllReduxTaskThunk = (): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  localStorageAll ? dispatch(saveTasks(localStorageAll)) : null;
}

export const saveTaskThunk = (text: string): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  localStorageAll 
  ?  localStorage.setItem('pomodoro', JSON.stringify([...localStorageAll, defoultTasks(text)]))
  :  localStorage.setItem('pomodoro', JSON.stringify([defoultTasks(text)]))
  dispatch(addTask(text))
}

export const updateTimeThunk = (id: number | null, time: number): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.timeLeft = task.timeLeft + time : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(updateTimeTask(id, time))
}

export const incPriorityThunk = (id: number): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.count = task.count + 1 : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(incPriorityTask(id))
}

export const decPriorityThunk = (id: number): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.count = task.count - 1 : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(decPriorityTask(id))
}

export const editTaskThunk = (id: number, text: string): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.text = text : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(editTask(id, text))
}

export const doneTaskThunk = (id: number | null, done: boolean): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.done = done : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(doneTask(id, done))
}

export const removeTaskThunk = (id: number): ThunkAction<void, any, unknown, AnyAction> => (dispatch, state) => {
  let localStorageAll = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  localStorageAll ? localStorageAll = localStorageAll.filter((el: { id: number; }) => el.id != id) : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(removeTask(id))
}

export const pauseTimeThunk = (id: number | null): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.pauseTime = task.pauseTime + 1 : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(PauseTimeStats(id))
}

export const pauseCountThunk = (id: number | null): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.pauseCount = task.pauseCount + 1 : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(PauseTimeStats(id))
}

export const timerStatusTaskThunk = (id: number | null, status: TimerStatus): ThunkAction<void, any, unknown, AnyAction> => (dispatch) => {
  let localStorageAll: ITasks[] = JSON.parse(`${localStorage.getItem('pomodoro')}`)
  let task = localStorageAll.find(item => item.id == id);
  task ? task.timerStatus = status : null
  localStorage.setItem('pomodoro', JSON.stringify(localStorageAll))
  dispatch(statusTimerTask(id, status))
}
