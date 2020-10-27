import React, { useRef, useEffect } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import Button from './../Button';
import Message from './../Message';
import docDefinition from '../../utils/docDefinition';

import './styles.scss';

const MessagesList = ({
  messagesList,
  userData,
  hasUserApproval,
  onSelect,
}) => {
  const messagesListRef = useRef(null);

  const scrollToBottom = () => {
    const { current } = messagesListRef;
    current.scrollTop = current.scrollHeight;
    console.log('happens');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  const onClick = ({ name, type }) => {
    if (type === 'document') {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const data = hasUserApproval ? userData : {};
      pdfMake.createPdf(docDefinition(data, name)).download(name);
    } else {
      onSelect(true, `I have selected the ${type} ${name}`);
    }
  };

  const messages = messagesList.map(({ message, isFromUser }, index) =>
    message.type ? (
      <Button
        {...message}
        onClick={() => onClick(message)}
        key={JSON.stringify(message) + index}
      />
    ) : (
      <Message
        isFromUser={isFromUser}
        message={message}
        key={JSON.stringify(message) + index}
      />
    )
  );

  return (
    <div className="messages-list" ref={messagesListRef}>
      <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        {messages}
      </CSSTransitionGroup>
    </div>
  );
};

export default MessagesList;
