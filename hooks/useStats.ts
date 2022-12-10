import { IStats } from './../redux/stats/reduser';
import { Week } from './../redux/stats/actions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/redusers';
import { ITasks } from '../redux/tasks/action';

export function useStats() {
  const tasks = useSelector<RootState, ITasks[]>((state) => state.tasks);
  const { week, oneDayWeek } = useSelector<RootState, IStats>((state) => state.stats);



  // Расчеты относительно недели
  let oneWeek: ITasks[]

  if (week === Week.CURRENT) {
    oneWeek = tasks.filter(el => el.id >= (el.id - 604800000))
  } else if (week === Week.PREVIOUS) {
    oneWeek = tasks.filter(el => el.id <= (el.id - 604800000) && el.id >= (el.id - 1209600000))
  } else if (week === Week.PREV_PREV) {
    oneWeek = tasks.filter(el => el.id <= (el.id - 1209600000) && el.id >= (el.id - 1814400000))
  }

  // Данные в TimeDay

  const timeDay = () => {
    let time = oneWeek;
    let nameDay;
    switch (oneDayWeek) {
      case 0:
        nameDay = 'Понедельник'
        break
      case 1:
        nameDay = 'Вторник'
        break
      case 2:
        nameDay = 'Среда'
        break
      case 3:
        nameDay = 'Четверг'
        break
      case 4:
        nameDay = 'Пятница'
        break
      case 5:
        nameDay = 'Суббота'
        break
      case 6:
        nameDay = 'Воскресенье'
        break
    }
    if (oneDayWeek || oneDayWeek === 0) {
      time = time.filter(el => el.day  === oneDayWeek)
    }
    let seconds = time.reduce((accum,item) => accum + (1500 - item.timeLeft), 0)
    let minutes = Math.floor(seconds / 60)
    return {
      minutes: minutes,
      nameDay: nameDay,
    }
  }

  const ChartData = (): any => {
    let dayColumn: any = [];
    for (let i = 0; i <= 6; i++) {
      let nameDay;
      const pixelColumn = Math.floor(oneWeek.filter(el => el.day === i).reduce((accum,item) => accum + (1500 - item.timeLeft), 0) / 60) * 3.3
      let text = oneWeek.filter(el => el.day === i)
      switch (i) {
        case 0:
          nameDay = 'Пн'
          break
        case 1:
          nameDay = 'Вт'
          break
        case 2:
          nameDay = 'Ср'
          break
        case 3:
          nameDay = 'Чт'
          break
        case 4:
          nameDay = 'Пт'
          break
        case 5:
          nameDay = 'Сб'
          break
        case 6:
          nameDay = 'Вс'
          break
      }
      if (pixelColumn) {
        if (oneDayWeek === i) {
          dayColumn.push({ 
            nameDay: nameDay,
            height: pixelColumn,
            backgroundColor: '#DC3E22'
          })
        } else {
          dayColumn.push({ 
            nameDay: nameDay,
            height: pixelColumn,
            backgroundColor: '#EA8A79'
          })
        }
      } else {
        dayColumn.push({
          nameDay: nameDay,
          height: 5,
          backgroundColor: '#c4c4c4'
      })
    }
  }
    return dayColumn
  }
  const chartData = ChartData()

  const sumFinichTomato = () => {
    let sumFinichTomato = oneWeek.filter(el => el.done === true).length
    return sumFinichTomato
  }
  const countTomatData = sumFinichTomato()

  const focus = () => {
    const accumFocusTimeLeft = tasks.filter(el => el.timeLeft != 1500).reduce((accum,item) => accum + (1500 - item.timeLeft), 0)
    const accumFocusPauseTime = tasks.filter(el => el.pauseTime != 0).reduce((accum,item) => accum + item.pauseTime, 0)
    let focus = Math.round((accumFocusTimeLeft / (accumFocusTimeLeft + accumFocusPauseTime)) * 100)
    if (!focus) focus = 0
    return `${focus}%`
  }
  const focusData = focus()

  const pauseTime = () => {
    let minutesPause = Math.floor(tasks.filter(el => el.pauseTime != 0).reduce((accum, item) => accum + item.pauseTime, 0) / 60)
    return `${minutesPause}м`
  }
  const pauseTimeData = pauseTime();

  const pauseCount = () => {
    const accumCount = tasks.filter(el => el.pauseCount != 0).reduce((accum, item) => accum + item.pauseCount, 0)
    return `${accumCount}`
  }
  const pauseCountData = pauseCount();


  return {
    week,
    timeDay,
    chartData,
    countTomatData,
    focusData,
    pauseTimeData,
    pauseCountData
  }
}
