import React from 'react';

import ArrowIcon from '../../images/arrow.png';
import CheckListIcon from '../../images/checklist.png';

import './styles.scss';

const Button = ({ type, image, name, value, isPrimary, onClick }) => {
  const icon = image ? image : type === 'document' ? CheckListIcon : ArrowIcon;

  const handleClick = () => {
    onClick(true, `I've selected the ${type}: ${name}`);
  };
  return (
    <div
      className={`${isPrimary ? 'primary' : 'button'}`}
      key={name}
      onClick={handleClick}
    >
      <p className="label">{name ? name : value}</p>
      {image ? <img className="icon" src={icon} /> : null}
    </div>
  );
};

export default Button;
