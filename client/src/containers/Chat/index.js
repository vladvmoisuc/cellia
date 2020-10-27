import React, { useState, useEffect, useRef } from 'react';

import Header from '../../components/Header';
import MessagesList from '../../components/MessagesList';
import InputForm from '../../components/InputForm';

import {
  oldUserGeneratedMessages,
  newUserGeneratedMessages,
} from '../../utils/generatedMessages';

import service from '../../utils/service';
import typingDNA from '../../utils/typingDNA';

import './styles.scss';

const typingService = typingDNA();

const Chat = ({ hasLoggedIn }) => {
  const [userData, setUserData] = useState({});
  const [hasUserApproval, setUserApproval] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messagesList, changeMessagesList] = useState([]);
  const [previosPlaceholderIndex, setPreviosPlaceholderIndex] = useState(null);
  const generatedMessages = hasLoggedIn
    ? oldUserGeneratedMessages
    : newUserGeneratedMessages;

  const changeInputValue = ({ target: { value } }) => {
    setInputValue(value);
  };

  const submitMessage = (isFromUser = true, message = inputValue) => {
    changeMessagesList((messagesList) => [
      ...messagesList,
      {
        isFromUser,
        message: typeof message === 'string' ? message.trim() : message,
      },
    ]);

    setInputValue('');
  };

  useEffect(() => {
    if (hasLoggedIn) {
      setUserApproval(true);
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }

    getUserAproval();
    getUserData();
    handleMessages();
  }, [messagesList]);

  const getUserData = () => {
    const userDataIndexes = {
      fn: 10,
      ln: 12,
      city: 14,
      state: 16,
      zip: 18,
      phone: 20,
      dob: 22,
      id: 24,
    };

    Object.keys(userDataIndexes).forEach((key) => {
      const position = userDataIndexes[key];
      if (messagesList.length === position) {
        setUserData({ ...userData, [key]: messagesList[position - 1].message });
      }
    });
  };

  const handleMessages = () => {
    const hasLastMessageFromUser =
      !!messagesList.length && messagesList[messagesList.length - 1].isFromUser;

    if (!messagesList.length || hasLastMessageFromUser) {
      const missingMessageIndex = generatedMessages.findIndex(
        (message, index) => {
          return index > previosPlaceholderIndex ? message === null : false;
        }
      );
      setPreviosPlaceholderIndex(missingMessageIndex);
      const celliaMessages = generatedMessages.slice(
        currentMessageIndex,
        missingMessageIndex
      );

      celliaMessages.forEach((message, index) => {
        setTimeout(() => {
          submitMessage(false, message);
        }, (index + 1) * 1000);
      });

      setCurrentMessageIndex(missingMessageIndex + 1);
    }
  };

  useEffect(() => {
    const saveUser = async () =>
      await service.post(
        `save/${userData.fn.toLowerCase()} ${userData.ln.toLowerCase()}`,
        {
          tp: typingService.getTypingPattern({
            type: 1,
          }),
        }
      );

    if (hasUserApproval) {
      saveUser();
    }
  }, [hasUserApproval]);

  const getUserAproval = () => {
    if (messagesList.length === 40) {
      window.localStorage.setItem('userData', JSON.stringify(userData));
      setUserApproval(true);
    }
  };

  return (
    <div className="chat-container">
      <Header />
      <MessagesList
        messagesList={messagesList}
        onSelect={submitMessage}
        userData={userData}
        hasUserApproval={hasUserApproval}
      />
      <InputForm
        value={inputValue}
        onChange={changeInputValue}
        onSubmit={submitMessage}
      />
    </div>
  );
};

export default Chat;
