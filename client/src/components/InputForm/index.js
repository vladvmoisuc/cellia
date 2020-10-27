import React from 'react';

import ArrowIconWhite from '../../images/arrow-white.png';

import './styles.scss';

const InputForm = ({
  value,
  placeholder,
  size = 'normal',
  onChange,
  onSubmit,
}) => {
  const handleEnterPress = ({ key }) => {
    if (key === 'Enter') onSubmit();
  };

  const handleSubmit = () => onSubmit();

  return (
    <div
      className={`${
        size === 'large' ? 'input-form-large input-form' : 'input-form'
      }`}
    >
      <input
        className="input-field"
        onKeyPress={handleEnterPress}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : 'Type here your answer'}
      />
      <div className="send-button" onClick={handleSubmit}>
        <img src={ArrowIconWhite} />
      </div>
    </div>
  );
};

export default InputForm;
