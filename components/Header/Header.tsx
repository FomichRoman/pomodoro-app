import Link from 'next/link';
import React from 'react';
import s from './Header.module.css';
import Logo from '@icons/logo.svg'
import Menu from '@icons/menu.svg'

interface IHeader {
  link: string;
  span: string;
}

export const Header = ({ link, span }: IHeader) => {
  return (
    <header className={s.header}>
      <div className={`container ${s.header__container}`}>
        <Link className={s.logo} href='/'>
          <Logo />
          <span>pomodoro_box</span>
        </Link>
        <Link href={link} className={s.link}>
          <Menu />
          <span>{span}</span>
        </Link>
      </div>
    </header>
  );
};
