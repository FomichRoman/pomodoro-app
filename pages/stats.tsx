import Head from 'next/head';
import React from 'react';
import { Header } from '@/components/Header/Header';
import { InfoBlock } from '../components/StatsPage/InfoBlock/InfoBlock';
import { Chart } from '../components/StatsPage/Сhart/Chart';
import { StatsMenu } from '../components/StatsPage/StatsMenu/StatsMenu';
import { useStats } from '../hooks/useStats';
import s from '../styles/Statistics.module.css';
import { CountTime } from '../components/StatsPage/CountTime/CountTime';
import { CountTomat } from '../components/StatsPage/CountTomat/CountTomat';
import FocusIcon from '@icons/focus-icon.svg';
import PauseTimeIcon from '@icons/pausetime-icon.svg';
import PauseCount from '@icons/pausecount-icon.svg';

export default function Statistics() {
  const { week, timeDay, countTomatData, chartData, focusData, pauseTimeData, pauseCountData } = useStats();
  return (
    <>
      <Head>
        <title>Pomodoro | Статистика</title>
      </Head>
      <Header link={'/'} span={'Задания'} />
      <main>
        <div className={`container ${s.statistics__container}`}>
          <StatsMenu week={week} />
          <div className={s.top_wrap}>
            <div className={s.left_block}>
              <CountTime week={week} timeDay={timeDay} />
              <CountTomat countTomatData={countTomatData} />
            </div>
            <div className={s.right_block}>
              <Chart chartData={chartData} />
            </div>
          </div>
          <div className={s.bottom_wrap}>
            <InfoBlock title={'Фокус'} backColor={'#FFDDA9'} data={focusData}>
              <FocusIcon />
            </InfoBlock>
            <InfoBlock title={'Время на паузе'} backColor={'#DFDCFE'} data={pauseTimeData}>
              <PauseTimeIcon />
            </InfoBlock>
            <InfoBlock title={'Остановки'} backColor={'#C5F1FF'} data={pauseCountData}>
              <PauseCount />
            </InfoBlock>
          </div>
        </div>
      </main>
    </>
  );
}
