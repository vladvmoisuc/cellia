import React from 'react';

import NurseImage from '../../images/cute-scrubs.jpeg';

import './styles.scss';

const Header = () => (
  <div className="header">
    <img src={NurseImage} className="avatar" />
    <div className="content">
      <p className="title">Cillia</p>
      <p className="subtitle">Typing assistant</p>
    </div>
  </div>
);

export default Header;
