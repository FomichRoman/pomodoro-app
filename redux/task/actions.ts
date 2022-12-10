import { ActionCreator } from "redux"

export enum taskType {
  TASKFORTIMER = 'TASKFORTIMER',
  DROPDOWN = 'DROPDOWN',
}

interface TaskForTimer {
  type: taskType.TASKFORTIMER,
  payload: number
}

interface TaskDropdown {
  type: taskType.DROPDOWN,
  payload: number
}

export type TaskAction = TaskForTimer | TaskDropdown



export const saveTaskId: ActionCreator<TaskForTimer> = (id: number) => ({
  type: taskType.TASKFORTIMER,
  payload: id,
})

export const isOpenDropdown: ActionCreator<TaskDropdown> = (id: number) => ({
  type: taskType.DROPDOWN,
  payload: id,
})
