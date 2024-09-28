'use client';
import Loader from '@/components/Loader';
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Popconfirm, Select,Typography, Space, Table, message } from 'antd'
import Search from 'antd/es/input/Search';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import useAxios from '../../utils/useAxios';
// import { useSelector } from 'react-redux';
// import { dotzURL } from '../../utils/apiConfig';
const { Title } = Typography;

const CustomerList = () => {
  const router = useRouter()
    // const navigate = useNavigate()
    // const api = useAxios()
    // const organizationDetails = useSelector(state => state.organization_details);

    const [data, setData] = useState([])

    // ==================
    const columns = [
        {
            title: 'Customer Code',
            dataIndex: 'customer_code',
            key: 'customer_code',
            render: (text) => <p>{text}</p>,
          },
          {
          title: 'Customer Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <p>{text}</p>,
        },
        {
          title: 'Address',
          key: 'address',
          dataIndex: 'address',
          render: (text) => <p>{text}</p>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              {/* <a><EditOutlined /></a> */}
              <Link to={`/create-product?id=${record.id}`}><EditOutlined /></Link>
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this product?"
                onConfirm={() => deleteProduct(record.id)}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: 'red',
                    }}
                  />
                }
              >
              <a><DeleteOutlined style={{color:'red'}} /></a>
              </Popconfirm>
            </Space>
          ),
        },
      ];
    // const data = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: ['nice', 'developer'],
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park',
    //       tags: ['loser'],
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sydney No. 1 Lake Park',
    //       tags: ['cool', 'teacher'],
    //     },
    //   ];
    //   ========================
    const onSearch = async (value) => {
        // Perform search operations here based on the value
        console.log('Searching for:', value);
        const requestData = {
          search: value,
          // organization_id: organizationDetails.id,
          // Add more key-value pairs as needed
      };
        // const response = await api.post(`${dotzURL}product/products/`,requestData)
        // if (response.data.status === 1000){
        //   console.log("response==>",response.data.data);
        //   setData(response.data.data);
        // }
    };

    const deleteProduct = async (productId) => {
        console.log('delete productId:', productId);
      // const response = await api.delete(`${dotzURL}product/products/${organizationDetails.id}/${productId}`)
      //   if (response.data.status === 1000){
      //     message.success(response.data.message)
      //     fetchInitial();
      //   }else if (response.data.status === 1001){
      //     message.warning(response.data.message)
      //   }
      //   else{
      //     message.error("Something went wrong!")
      //   }
    };

    const fetchInitial = async () =>{
      // console.log("organizationDetails.id===>",organizationDetails.id);
      // const response = await api.get(`${dotzURL}product/products/${organizationDetails.id}`)
      // console.log("response==>",response);
      // if (response.data.status === 1000){
      //   setData(response.data.data);
      // }
    }

    useEffect(() => {
      fetchInitial();
    }, [])
    
  return (
    <div>
        <Loader coming />
        <Title level={4}>Customers List</Title>
        <Divider />

        <Flex gap="small" justify='space-between' wrap="wrap">
        {/* <div style={{display:'flex', justifyContent:'space-between'}}>  */}

        <Search style={{width:'50%'}} placeholder="Search customer" onSearch={onSearch} enterButton allowClear/>
        {/* <Space>
        Product Group:<Select
        defaultValue="All"
        style={{
            width: 150,
        }}
        options={[
            {
            value: 'All',
            label: 'All',
            },
            {
            value: 'PrimaryGroup',
            label: 'PrimaryGroup',
            },
            {
            value: 'Group2',
            label: 'Group2',
            disabled: true,
            },
        ]}
        />
        </Space> */}
        <div> 
         <Button className='ml-10'  shape="round" icon={<UploadOutlined />} >
            Import
          </Button>
          <Button className='ml-10' shape="round" icon={<DownloadOutlined />} >
            Export
          </Button>
          {/* <Button onClick={() => {router.push('products/create')}} className='ml-10' type="primary" shape="round" icon={<PlusCircleOutlined />} >
            Create Product
          </Button> */}
        {/* </div> */}
        </div>
          </Flex>

        <Divider />

        <Table theme="dark" columns={columns} dataSource={data} />
    </div>
    
  )
}

export default CustomerList