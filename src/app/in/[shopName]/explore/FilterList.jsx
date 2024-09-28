import React, { useState } from 'react';
import { Checkbox, Divider, Input, Radio, Space } from 'antd';
const FilterList = ({categories, variants, brands, sort, setState}) => {
  const [value, setValue] = useState(1);
  const categoryOptions = [
    {
      label: 'Apple',
      value: 'Apple',
    },
    {
      label: 'Pear',
      value: 'Pear',
    },
    {
      label: 'Orange',
      value: 'Orange',
    },
  ];
  const colorOptions = [
    {
      label: 'Black',
      value: 'Black',
    },
    {
      label: 'White',
      value: 'White',
    },
    {
      label: 'Red',
      value: 'Red',
    },
  ];
  const sizeOptions = [
    {
      label: 'XS',
      value: 'XS',
    },
    {
      label: 'S',
      value: 'S',
    },
    {
      label: 'M',
      value: 'M',
    },
    {
      label: 'L',
      value: 'L',
    },
    {
      label: 'XL',
      value: 'XL',
    },
  ];
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  console.log("value==>",value);
  
  return (
    <div className="container rounded-lg p-5" style={{background:'#d3d3d357'}}>
        <h2 className="font-medium text-2xl pb-1">Filter By</h2>
        
        <div>
        <Divider style={{marginBottom: '10px'}} orientation="left" className='m-0'>Sorting Order</Divider>
        <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
            <Radio value={1}>Newest</Radio>
            <Radio value={2}>Price Low - High</Radio>
            <Radio value={3}>Price High - Low</Radio>
        </Space>
        </Radio.Group>
        </div>
        <div  className='mt-5'>
        <Divider style={{marginBottom: '10px'}}  orientation="left">Categories</Divider>
            {categories.map(option => (
            <div key={option.id} className='mb-1'>
                <Checkbox value={option.id}>{option.name}</Checkbox>
            </div>
            ))}
        </div>
        {variants.length > 0 &&
          <div  className='mt-5'>
          <Divider style={{marginBottom: '10px'}}  orientation="left">Variants</Divider>
              {variants.map(option => (
              <div key={option.id} className='mb-1'>
                  <Checkbox value={option.id}>{option.name}</Checkbox>
              </div>
              ))}
          </div>
        }
        <div  className='mt-5'>
        <Divider style={{marginBottom: '10px'}}  orientation="left">Brands</Divider>
            {brands.map(option => (
            <div key={option.id} className='mb-1'>
                <Checkbox value={option.id}>{option.name}</Checkbox>
            </div>
            ))}
        </div>
    </div>
  )
}

export default FilterList