import React from 'react';
import './styles.scss';

export const GenericButton = ({ title, onClick }) => {
  return <button className="billsnap__generic-btn" onClick={onClick}>{title}</button>
}
