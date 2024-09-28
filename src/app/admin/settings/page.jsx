"use client";
import React, { useState } from 'react';
import { Tabs } from 'antd';
import GeneralSettings from './GeneralSettings';
import axiosInstance from '@/utils/axiosInstance';
import { EshopBaseUrlV1 } from '@/utils/GlobalVariables';
import toast from 'react-hot-toast';
const { TabPane } = Tabs;

const Settings = () => {
  const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));
   
  const handleUpdate = async (checked, data) => {
    console.log("checked:", checked);
    console.log("data:", data);
    const payload = {
      organization: organizationDetails.id,
      value: checked,
      group: data.group,
      name: data.id
    };
    
    const response = await axiosInstance.post(`${EshopBaseUrlV1}/organization/settings/`, payload);
    if (response.data.status === 1000) {
      toast.success(response.data.message);
    } else {
      toast.error('Failed to update settings');
    }
  }
            
    
  return (
    <div className='p-3'>
      <h1 className='text-xl mb-3'>Settings</h1>
      {/* <Tabs
        defaultActiveKey="1"
        tabPosition={'left'}
        style={{
        //   height: '75vh',
        }}
        items={items}
      /> */}
      <Tabs  defaultActiveKey="1" type="card">

      <TabPane tab="General" key="1">
        {/* Content for the General settings */}
        <GeneralSettings handleUpdate={handleUpdate} organization={organizationDetails.id} />
      </TabPane>

      <TabPane tab="Account" key="2" disabled>
        {/* Content for the Account settings */}
        <p>Account settings go here.</p>
      </TabPane>
      <TabPane tab="Security" key="3" disabled>
        {/* Content for the Security settings */}
        <p>Security settings go here.</p>
      </TabPane>
      <TabPane tab="Users" key="4" disabled>
        {/* Content for the Security settings */}
        <p>Users settings go here.</p>
      </TabPane>
      <TabPane tab="User Roles" key="6" disabled>
        {/* Content for the Security settings */}
        <p>User Roles settings go here.</p>
      </TabPane>
      <TabPane tab="Inventory" key="5" disabled>
        {/* Content for the Security settings */}
        <p>Inventory settings go here.</p>
      </TabPane>
    </Tabs>
    </div>
  );
}

export default Settings;
