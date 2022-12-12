import { ActionCreator } from 'redux';

export interface ITasks {
  id: number,
  text: string,
  count: number,
  done: boolean,
  timeLeft: number
  day: number,
  pauseTime: number,
  pauseCount: number,
  timerStatus: TimerStatus
}

export enum TimerStatus {
  OFF,
  POMODORO_ON,
  POMODORO_PAUSE,
  BREAK_ON,
  BREAK_PAUSE,
}

export function defoultTasks(text: string) {
  return {
  id: Date.now(),
  text: text,
  count: 1,
  done: false,
  timeLeft: 5,
  day: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1,
  pauseTime: 0,
  pauseCount: 0,
  timerStatus: TimerStatus.OFF
}}

export enum tasksActionType {
  ALL = 'ALL',
  ADD = 'ADD',
  UPDATETIME = 'UPDATETIME',
  DECREMENT = 'DECREMENT_TASK',
  INCPRIORITY = 'INCPRIORITY',
  DECPRIORITY = 'DECPRIORITY',
  EDIT = 'EDIT',
  DONE = 'DANE_TASK',
  REMOVE = 'REMOVE_TASK',
  PAUSETIME = 'PAUSETIME',
  PAUSECOUNT = 'PAUSECOUNT',
  STATUS = 'STATUS'
}

export const POMODORO_TIME = 25 * 60 // 25 minutes
export const SHORT_BREAK_TIME = 5 * 60 // 5 minutes
export const LONG_BREAK_TIME = 15 * 60 // 15 minutes

interface AllTaskAction {
  type: tasksActionType.ALL,
  payload: ITasks[],
}

interface AddTaskAction {
  type: tasksActionType.ADD,
  payload: ITasks,
}

interface UpTimeTaskAction {
  type: tasksActionType.UPDATETIME,
  payload: {
    id: number,
    time: number
  };
}

interface IncPriorityTaskAction {
  type: tasksActionType.INCPRIORITY,
  payload: number;
}

interface DecPriorityTaskAction {
  type: tasksActionType.DECPRIORITY,
  payload: number;
}

interface EditTaskAction {
  type: tasksActionType.EDIT,
  payload: {
    id: number,
    text: string
  };
}

interface DoneTaskAction {
  type: tasksActionType.DONE,
  payload: {
    id: number,
    done: boolean
  };
}

interface RemoveTaskAction {
  type: tasksActionType.REMOVE,
  payload: number;
}

interface PauseTimeStatsAction {
  type: tasksActionType.PAUSETIME,
  payload: number
}

interface PauseCountStatsAction {
  type: tasksActionType.PAUSECOUNT,
  payload: number,
}

interface StatusTimerTaskAction {
  type: tasksActionType.STATUS,
  payload: {
    id: number,
    status: TimerStatus
  }
}


export type TasksAction = AllTaskAction | AddTaskAction| UpTimeTaskAction | IncPriorityTaskAction | DecPriorityTaskAction | EditTaskAction | DoneTaskAction | RemoveTaskAction | PauseTimeStatsAction | PauseCountStatsAction | StatusTimerTaskAction

export const saveTasks: ActionCreator<AllTaskAction> = (array: ITasks[]) => ({
  type: tasksActionType.ALL,
  payload: array,
})

export const addTask: ActionCreator<AddTaskAction> = (text) => ({
  type: tasksActionType.ADD,
  payload: defoultTasks(text),
})


export const updateTimeTask: ActionCreator<UpTimeTaskAction> = (id: number, time: number) => ({
  type: tasksActionType.UPDATETIME,
  payload: { id, time }
})

export const incPriorityTask: ActionCreator<IncPriorityTaskAction> = (id: number) => ({
  type: tasksActionType.INCPRIORITY,
  payload: id,
})

export const  decPriorityTask: ActionCreator<DecPriorityTaskAction> = (id: number) => ({
  type: tasksActionType.DECPRIORITY,
  payload: id,
})

export const  editTask: ActionCreator<EditTaskAction> = (id: number, text: string) => ({
  type: tasksActionType.EDIT,
  payload: {id, text}
})

export const  doneTask: ActionCreator<DoneTaskAction> = (id: number, done: boolean) => ({
  type: tasksActionType.DONE,
  payload: {id, done}
})

export const removeTask: ActionCreator<RemoveTaskAction> = (id: number) => ({
  type: tasksActionType.REMOVE,
  payload: id,
})

export const PauseTimeStats: ActionCreator<PauseTimeStatsAction> = (id: number) => ({
  type: tasksActionType.PAUSETIME,
  payload: id,
})

export const PauseCountStats: ActionCreator<PauseCountStatsAction> = (id: number) => ({
  type: tasksActionType.PAUSECOUNT,
  payload: id,
})

export const statusTimerTask: ActionCreator<StatusTimerTaskAction> = (id, status: TimerStatus) => ({
  type: tasksActionType.STATUS,
  payload: {id, status},
})