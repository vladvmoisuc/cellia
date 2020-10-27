import React, { useState } from 'react';

import service from '../../utils/service';
import typingDNA from '../../utils/typingDNA';

import DividerImage from '../../images/divider.png';
import InputForm from '../../components/InputForm';
import Button from '../../components/Button';

import './styles.scss';

const typingService = typingDNA();

const Home = ({ onLogin, onSelect }) => {
  const [inputValue, setInputValue] = useState('');

  const changeInputValue = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleLogin = async () => {
    try {
      const response = await service.post(
        `verify/${inputValue.toLowerCase()}`,
        {
          tp: typingService.getTypingPattern({ type: 1 }),
        }
      );

      if (response.status === 200) {
        onLogin(true);
      }
    } catch (error) {}

    setInputValue('');
  };

  return (
    <div className="home">
      <div className="top-side">
        <div className="heading">
          <h1>Cellia</h1>
          <p>Your writing assistant</p>
        </div>
        <img src={DividerImage} />
      </div>
      <div className="bottom-side ">
        <InputForm
          size="large"
          placeholder="Type your full name to login"
          value={inputValue}
          onChange={changeInputValue}
          onSubmit={handleLogin}
        />
        <Button
          isPrimary
          value="I'm a new user"
          onClick={() => onSelect(true)}
        />
      </div>
    </div>
  );
};

export default Home;
