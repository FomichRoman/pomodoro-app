import { StatsAction, statsType, Week } from "./actions"



export interface IStats {
  week: Week
  oneDayWeek: number | null;
  pauseTime: number,
  pauseCount: number
}


const initialState: IStats =
  {
    week: Week.CURRENT,
    oneDayWeek: null,
    pauseTime: 0,
    pauseCount: 0
  }


export const statsReduser = (state = initialState, action: StatsAction):  IStats => {
  switch (action.type) {
    case statsType.WEEK:
      return {...state, week: action.payload}
    case statsType.ONEDAY:
      return {...state, oneDayWeek: action.payload}
    default:
      return state
}
}