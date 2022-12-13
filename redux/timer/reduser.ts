import { TimerStatus } from "@redux/tasks/action"
import { TimerAction, timerType } from "./actions"


export interface ITimerStatus {
  status: TimerStatus
}


const initialState: ITimerStatus =
  {
    status: TimerStatus.OFF,
  }


export const timerReduser = (state = initialState, action: TimerAction):  ITimerStatus => {
  switch (action.type) {
    case timerType.STATUS:
      return { ...state, status: action.payload }
    default:
      return state
}
}