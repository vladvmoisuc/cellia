import React from 'react';

import NurseImage from '../../images/cute-scrubs.jpeg';

import './styles.scss';

const Message = ({ isFromUser, message }) => {
  const messageClassName = `message ${isFromUser ? 'active' : ''}`;

  return (
    <div className={messageClassName} key={message}>
      <img src={NurseImage} className="avatar" />
      <p className="message-text">{message}</p>
    </div>
  );
};

export default Message;
