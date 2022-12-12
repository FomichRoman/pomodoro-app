import { TimerStatus } from "@redux/tasks/action"
import { TaskAction, taskType } from "./actions"


export interface ITimerStatus {
  status: TimerStatus
}


const initialState: ITimerStatus =
  {
    status: TimerStatus.OFF,
  }


export const taskReduser = (state = initialState, action: TaskAction):  ITimerStatus => {
  switch (action.type) {
    case taskType.STATUS:
      return { ...state, status: action.payload }
    default:
      return state
}
}