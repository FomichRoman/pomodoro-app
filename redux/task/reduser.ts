import { TaskAction, taskType } from "./actions"


export interface ITask {
  id: number | null
  idDrop: number | null;
}


const initialState: ITask =
  {
    id: null,
    idDrop: null,
  }


export const taskReduser = (state = initialState, action: TaskAction):  ITask => {
  switch (action.type) {
    case taskType.TASKFORTIMER:
      return { ...state, id: action.payload }
    case taskType.DROPDOWN:
      return { ...state, idDrop: action.payload }
    default:
      return state
}
}