// components/FeaturesList.js
"use client";
import { List, Typography } from 'antd';
const { Text } = Typography;
// import Link from 'next/link';

const features = [
  { id: 1, name: 'Categories', path: '/admin/categories', disabled:false },
  { id: 2, name: 'Brands', path: '/admin/brands', disabled:false },
  { id: 3, name: 'Units', path: '/admin/units', disabled:false },
  { id: 4, name: 'Supplier', path: '/admin/supplier', disabled:true },
  { id: 5, name: 'Stock Management', path: '/admin/supplier', disabled:true },
  { id: 6, name: 'Reports', path: '/admin/reports', disabled:true },
  { id: 7, name: 'Settings', path: '/admin/settings', disabled:false },
  // Add more features here
];

const FeaturesList = () => {
  return (
    <div className='p-5'>
      <h1 className='text-xl mb-3'>More</h1>
      <List
      bordered
      dataSource={features}
      renderItem={feature => (
        <List.Item >
          {/* <Link href={feature.path}> */}
          {feature.disabled ? (
            <Text disabled>{feature.name}</Text>
          ) : (
            <a href={feature.path} className='text-slate-800 hover:text-[#1777ff]'>{feature.name}</a>

          )}
          {/* </Link> */}
        </List.Item>
      )}
    />
    </div>
  );
};

export default FeaturesList;