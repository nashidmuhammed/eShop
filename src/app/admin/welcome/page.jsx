'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, Row, Col, Typography } from 'antd';
import RegisterOrg from '@/components/RegisterOrg';
const { Option } = Select;  
const { Title } = Typography;
const WelcomePage = () => {
  const username = JSON.parse(localStorage.getItem('userDetails')).username;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <Title level={2}>Welcome, {username}!</Title>
      <p className='text-base'>We're excited to have you on board. Get started by registering your organization.</p>
      <Button type="primary" onClick={showModal} className="mt-5">
        Register New Organization
      </Button>

      <RegisterOrg  isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      
      
      
    </div>
  );
};

export default WelcomePage;