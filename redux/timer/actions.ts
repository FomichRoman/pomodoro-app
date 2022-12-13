import { TimerStatus } from "@redux/tasks/action"
import { ActionCreator } from "redux"

export enum timerType {
  STATUS = 'STATUS',
}

interface StatusTimer {
  type: timerType.STATUS,
  payload: TimerStatus
}


export type TimerAction = StatusTimer



export const statusTimer: ActionCreator<StatusTimer> = (status: TimerStatus) => ({
  type: timerType.STATUS,
  payload: status,
})

