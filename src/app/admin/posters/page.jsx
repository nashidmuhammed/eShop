'use client';
import axiosInstance from '@/utils/axiosInstance';
import { baseUrl, DotzBaseUrlV1, EshopBaseUrlV1 } from '@/utils/GlobalVariables';
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Popconfirm, Select,Typography, Space, Table, message } from 'antd'
import Search from 'antd/es/input/Search';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import useAxios from '../../utils/useAxios';
// import { useSelector } from 'react-redux';
// import { dotzURL } from '../../utils/apiConfig';
const { Title } = Typography;

const PostersList = () => {
  const router = useRouter()
    // const navigate = useNavigate()
    // const api = useAxios()
    // const organizationDetails = useSelector(state => state.organization_details);
    const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));

    const [data, setData] = useState([])

    // ==================
    const columns = [
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            render: (text) => <p>{text}</p>,
          },
        {
            title: 'Imgae',
            dataIndex: 'image',
            key: 'image',
            render: (url) => <img style={{height:'100px'}} src={baseUrl+url} />,
          },
        {
            title: 'Heading',
            dataIndex: 'heading',
            key: 'heading',
            render: (text) => <p className='font-semibold'>{text}</p>,
          },
          {
          title: 'Sub Heading',
          dataIndex: 'sub_heading',
          key: 'sub_heading',
          render: (text) => <p>{text}</p>,
        },
        {
          title: 'Content',
          key: 'content',
          dataIndex: 'description',
          render: (text) => <p>{text}</p>,
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'is_active',
          render: (is_active) => <p>{is_active ? "Active": "Inactive"}</p>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              {/* <a><EditOutlined /></a> */}
              <Link href={`/admin/posters/create?id=${record.id}`}><EditOutlined /></Link>
              <Popconfirm
                title="Delete the poster"
                description="Are you sure to delete this poster?"
                onConfirm={() => deletePoster(record.id)}
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

    const deletePoster = async (posterId) => {
        console.log('delete posterId:', posterId);
        const response = await axiosInstance.delete(`${EshopBaseUrlV1}/posters/delete/${posterId}/`);
        if (response.data.status === 1000){
          toast.success(response.data.message)
          fetchInitial();
        }else if (response.data.status === 1001){
          toast.error(response.data.message)
        }
        else{
          toast.error("Something went wrong!")
        }
    };

    
    const fetchInitial = async () =>{
      const response = await axiosInstance.post(`${EshopBaseUrlV1}/posters/poster-list/`, {organization_id: organizationDetails.id})
      if (response.data.status === 1000){
        setData(response.data.data);
      }
    }

    useEffect(() => {
      fetchInitial();
    }, [])
    
  return (
    <div>
        <Title level={4}>Posters List</Title>
        <Divider />

        <Flex gap="small" justify='space-between' wrap="wrap">
        {/* <div style={{display:'flex', justifyContent:'space-between'}}>  */}

        <Search style={{width:'50%'}} placeholder="Search posters" onSearch={onSearch} enterButton allowClear/>
        <Space>
        Status:<Select
        defaultValue="All"
        style={{
            width: 150,
        }}
        // onChange={handleChange}
        options={[
            {
            value: 'All',
            label: 'All',
            },
            {
            value: 'Active',
            label: 'Active',
            },
            {
            value: 'Inactive',
            label: 'Inactive',
            },
        ]}
        />
        </Space>
        <div> 
         {/* <Button className='ml-10'  shape="round" icon={<UploadOutlined />} >
            Import
          </Button>
          <Button className='ml-10' shape="round" icon={<DownloadOutlined />} >
            Export
          </Button> */}
          <Button onClick={() => {router.push('posters/create')}} className='ml-10' type="primary" shape="round" icon={<PlusCircleOutlined />} >
            Create Poster
          </Button>
        {/* </div> */}
        </div>
          </Flex>

        <Divider />

        <Table theme="dark" columns={columns} dataSource={data} />
    </div>
    
  )
}

export default PostersList