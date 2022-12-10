import React from 'react'
import s from './Modal.module.css';

interface IModal {
  modalHadler: () => void
}

export const Modal = ({modalHadler}: IModal) => {
  return (
    <div className={s.edit_modal} onClick={modalHadler} />
  )
}
