import { TimerStatus } from "@redux/tasks/action"
import { ActionCreator } from "redux"

export enum taskType {
  STATUS = 'STATUS',
}

interface StatusTimer {
  type: taskType.STATUS,
  payload: TimerStatus
}


export type TaskAction = StatusTimer



export const statusTimer: ActionCreator<StatusTimer> = (status: TimerStatus) => ({
  type: taskType.STATUS,
  payload: status,
})

