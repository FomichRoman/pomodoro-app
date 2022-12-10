import { ActionCreator } from "redux"

export enum statsType {
  WEEK = 'WEEK',
  ONEDAY = 'ONEDAY',
  PAUSETIME = 'PAUSETIME',
  PAUSECOUNT = 'PAUSECOUNT',
}

export enum Week {
  CURRENT = 'Эта неделя',
  PREVIOUS = 'Предыдущая неделя',
  PREV_PREV = '2 недели назад',
}

interface WeekStatsAction {
  type: statsType.WEEK,
  payload: Week,
}

interface DayWeekStatsAction {
  type: statsType.ONEDAY,
  payload: number;
}

export type StatsAction = WeekStatsAction | DayWeekStatsAction

export const WeekStats: ActionCreator<WeekStatsAction> = (week: Week) => ({
  type: statsType.WEEK,
  payload: week,
})

export const DayWeekStats: ActionCreator<DayWeekStatsAction> = (day: number) => ({
  type: statsType.ONEDAY,
  payload: day,
})