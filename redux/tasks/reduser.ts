import { ITasks, TasksAction, tasksActionType } from './action'

const initialState: ITasks[] = []

export const tasksReduser = (state = initialState, action: TasksAction):  ITasks[] => {
  switch (action.type) {
    case tasksActionType.ALL:
      return [...action.payload]
    case tasksActionType.ADD:
      return [...state, action.payload]
    case tasksActionType.UPDATETIME:
      let taskInc = state.find(item => item.id == action.payload.id);
      taskInc ? taskInc.timeLeft = taskInc.timeLeft + action.payload.time : null
      return [...state]
    case tasksActionType.INCPRIORITY:
      let taskCountInc = state.find(item => item.id == action.payload);
      taskCountInc ? taskCountInc.count = taskCountInc.count + 1 : null
      return [...state]
    case tasksActionType.DECPRIORITY:
      let taskCountDec = state.find(item => item.id == action.payload);
      taskCountDec ? taskCountDec.count = taskCountDec.count - 1 : null
      return [...state]
    case tasksActionType.EDIT:
      let taskEdit = state.find(item => item.id == action.payload.id);
      taskEdit ? taskEdit.text = action.payload.text : null
      return [...state]
    case tasksActionType.DONE:
      let taskDone = state.find(item => item.id == action.payload.id);
      taskDone ? taskDone.done = action.payload.done : null
      return [...state]
    case tasksActionType.REMOVE:
      state = state.filter(el => el.id != action.payload)
      return [...state]
    case tasksActionType.PAUSETIME:
      let taskPauseTime = state.find(item => item.id == action.payload);
      taskPauseTime ? taskPauseTime.pauseTime = taskPauseTime.pauseTime + 1 : null
      return [...state]
    case tasksActionType.PAUSECOUNT:
      let taskPauseCount = state.find(item => item.id == action.payload);
      taskPauseCount ? taskPauseCount.pauseCount = taskPauseCount.pauseCount + 1 : null
      return [...state]
    case tasksActionType.STATUS:
      let timerStatus = state.find(item => item.id == action.payload.id);
      timerStatus ? timerStatus.timerStatus = action.payload.status : null
      return [...state]
    default:
      return state

}
}