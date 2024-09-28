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

const PurchaseList = () => {
  const router = useRouter()
    // const navigate = useNavigate()
    // const api = useAxios()
    // const organizationDetails = useSelector(state => state.organization_details);

    const [data, setData] = useState([])

    // ==================
    const columns = [
      {
          title: 'Sl No',
          dataIndex: 'sl_no',
          key: 'sl_no',
          // render: (text) => <p>{text}</p>,
        },
      {
          title: 'Voucher No',
          dataIndex: 'voucher_no',
          key: 'voucher_no',
          render: (text) => <p>{text}</p>,
        },
        {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Ledger Name',
        key: 'ledger_name',
        dataIndex: 'ledger_name',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Gross Amount',
        key: 'gross_amount',
        dataIndex: 'gross_amount',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Total Tax',
        key: 'total_tax',
        dataIndex: 'total_tax',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Grand Total',
        key: 'grand_total',
        dataIndex: 'grand_total',
        render: (text) => <p>{text}</p>,
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
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
              title="Delete the sale"
              description="Are you sure to delete this sale?"
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
        <Title level={4}>Purchase List</Title>
        <Divider />

        <Flex gap="small" justify='space-between' wrap="wrap">
        {/* <div style={{display:'flex', justifyContent:'space-between'}}>  */}

        <Search style={{width:'50%'}} placeholder="Search purchases" onSearch={onSearch} enterButton allowClear/>
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
          <Button onClick={() => {router.push('purchase/create-invoice')}} className='ml-10' type="primary" shape="round" icon={<PlusCircleOutlined />} >
            Create Purchase
          </Button>
        {/* </div> */}
        </div>
          </Flex>

        <Divider />

        <Table theme="dark" columns={columns} dataSource={data} />
    </div>
    
  )
}

export default PurchaseList