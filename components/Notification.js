import React from 'react';
import { Button, notification } from 'antd';

const Notification= () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      duration: 0,
    });
  };
openNotification()
  return (
    <>
      {contextHolder}
    </>
  );
};

export default Notification;