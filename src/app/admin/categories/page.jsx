'use client';
import axiosInstance from '@/utils/axiosInstance';
import { baseUrl, DotzBaseUrlV1, EshopBaseUrlV1 } from '@/utils/GlobalVariables';
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Popconfirm, Select,Typography, Space, Table, message, Modal, Form, Input } from 'antd'
import Search from 'antd/es/input/Search';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import useAxios from '../../utils/useAxios';
// import { useSelector } from 'react-redux';
// import { dotzURL } from '../../utils/apiConfig';
const { Title, Text } = Typography;

const CategoryList = () => {
    const router = useRouter()
    // const navigate = useNavigate()
    // const api = useAxios()
    // const organizationDetails = useSelector(state => state.organization_details);
    const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));
    const [categoryForm] = Form.useForm();

    const [data, setData] = useState([])
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [EditingCategoryId, setEditingCategoryId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (id) => {
      // const newCategory = data.find(c => c.id === id)
      
      // categoryForm.setFieldsValue({ id: newCategory.id, name: newCategory.name, description: newCategory.description})
      const categoryToEdit = data.find(category => category.id === id);
      console.log("categoryToEdit==>",categoryToEdit);
      if (categoryToEdit) {
        setEditingCategoryId(id);
        categoryForm.setFieldsValue({
          category_name: categoryToEdit.name,
          description: categoryToEdit.description,
        });
      }
      setCategoryModalOpen(true)
    }

    const createCategory = async (values) => {
      values.organization = organizationDetails.id
      console.log("values===>",values);
      let response = null
      if(EditingCategoryId){
          values.pk = EditingCategoryId
          response = await axiosInstance.put(DotzBaseUrlV1+'/product/categories/',values)
      }else{
          response = await axiosInstance.post(DotzBaseUrlV1+'/product/categories/',values)
      }
      if (response.data.status === 1000){
          toast.success(response.data.message)
          setCategoryModalOpen(false)
          if(EditingCategoryId){
            const updatedCategories = data.map((category) =>
              category.id === EditingCategoryId? {...category, name: values.category_name, description: values.description } : category
            );
            setData(updatedCategories);
          }else{
            const newCategory = { id: response.data.data, name: values.category_name, description: values.description }
            setData((prevCategory) => [...prevCategory, newCategory])
            categoryForm.resetFields()
          }
      }else if (response.data.status === 1001){
          toast.error(response.data.message)
      }
  }

    // ==================
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>,
          },
          {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render: (text) => <p>{text}</p>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              {/* <a><EditOutlined /></a> */}
              {/* <Link href={`/admin/posters/create?id=${record.id}`}><EditOutlined /></Link> */}
              <EditOutlined onClick={() => handleEdit(record.id)} style={{ cursor: 'pointer' }} />
              <Popconfirm
                title="Delete the category"
                description="Are you sure to delete this category?"
                onConfirm={() => deleteItem(record.id)}
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
        setSearchTerm(value);
        fetchCategories(value);
    };
    const onDelySearch = useCallback((event) => {
      const value = event.target.value;
      console.log('Delayed search value:', value);
      setSearchTerm(value);
      fetchCategories(value);
    }, []);

    const handleCreate =  () => {
      setEditingCategoryId(null)
      categoryForm.resetFields()
      setCategoryModalOpen(true)
    };

    const deleteItem = async (uuId) => {
        console.log('delete uuId:', uuId);
        const values = {pk: uuId}
        // const response = await axiosInstance.delete(DotzBaseUrlV1+'/product/categories/',values);
        const response = await axiosInstance.delete(DotzBaseUrlV1 + '/product/categories/', {
          data: values, // This is where the data is passed
      });
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

    const addCategory = () => {
      setOpenCategory(false)
      setCategoryModalOpen(true)
  }
  const fetchCategories = async (searchTerm) => {
    try {
      const payload = {
        search: searchTerm,
        is_search:true,
        organization: organizationDetails.id,
      }
      const response = await axiosInstance.post(`${DotzBaseUrlV1}/product/categories/`,payload)
      
      if (response.data.status === 1000){
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


    
    const fetchInitial = async () =>{
      const response = await axiosInstance.get(`${DotzBaseUrlV1}/product/categories/${organizationDetails.id}`)
      // const response = await axiosInstance.post(`${EshopBaseUrlV1}/posters/poster-list/`, {organization_id: organizationDetails.id})
      if (response.data.status === 1000){
        setData(response.data.data);
      }
    }

    useEffect(() => {
      fetchInitial();
    }, [])
    
  return (
    <div>
        <Title level={4}>Product Categories</Title>
        <Divider />

        <Flex gap="small" justify='space-between' wrap="wrap">
        {/* <div style={{display:'flex', justifyContent:'space-between'}}>  */}

        <Search style={{width:'50%'}} placeholder="Search categories" onSearch={onSearch} onBlur={onDelySearch} enterButton allowClear/>
        <div> 
         {/* <Button className='ml-10'  shape="round" icon={<UploadOutlined />} >
            Import
          </Button>
          <Button className='ml-10' shape="round" icon={<DownloadOutlined />} >
            Export
          </Button> */}
          <Button onClick={() => {handleCreate()}} className='ml-10' type="primary" shape="round" icon={<PlusCircleOutlined />} >
            Create Category
          </Button>
        {/* </div> */}
        </div>
          </Flex>

        <Divider />

        <Table theme="dark" columns={columns} dataSource={data} />

        {/* --------- MODALS ------ */}
        <Modal
                title={EditingCategoryId ? "Edit category" : "Create a new Category"}
                centered
                open={categoryModalOpen}
                // onOk={createBrand()}
                // okText='Create'
                onCancel={() => setCategoryModalOpen(false)}
                footer={null}
            >
                 <Form
                    form={categoryForm}
                    name="category_form"
                    labelCol={{
                    span: 4,
                    }}
                    // wrapperCol={{
                    // span: 16,
                    // }}
                    style={{
                    maxWidth: 600,
                    paddingTop:'17px'
                    }}
                    // initialValues={{
                    // remember: true,
                    // }}
                    onFinish={createCategory}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Name"
                    name="category_name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your category name!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Description"
                    name="description"
                    >
                    <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                    <Button type="primary" htmlType="submit" block >
                        {EditingCategoryId ? 'Update' : 'Create'}
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
    </div>
    
  )
}

export default CategoryList