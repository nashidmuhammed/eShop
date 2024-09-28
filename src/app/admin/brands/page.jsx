'use client';
import axiosInstance from '@/utils/axiosInstance';
import { baseUrl, DotzBaseUrlV1, EshopBaseUrlV1 } from '@/utils/GlobalVariables';
import { DeleteOutlined, DownloadOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Popconfirm, Select,Typography, Space, Table, message, Modal, Form, Input } from 'antd'
import Search from 'antd/es/input/Search';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
const { Title, Text } = Typography;

const BrandList = () => {
    const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));
    const [categoryForm] = Form.useForm();

    const [data, setData] = useState([])
    const [categoryModalOpen, setModalOpen] = useState(false)
    const [EditingCategoryId, setEditingCategoryId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (id) => {
      const categoryToEdit = data.find(category => category.id === id);
      console.log("categoryToEdit==>",categoryToEdit);
      if (categoryToEdit) {
        setEditingCategoryId(id);
        categoryForm.setFieldsValue({
          brand_name: categoryToEdit.name,
          brand_code: categoryToEdit.brand_code,
          description: categoryToEdit.description,
        });
      }
      setModalOpen(true)
    }

    const createCategory = async (values) => {
      values.organization = organizationDetails.id
      console.log("values===>",values);
      let response = null
      if(EditingCategoryId){
          values.pk = EditingCategoryId
          response = await axiosInstance.put(DotzBaseUrlV1+'/product/brands/',values)
      }else{
          response = await axiosInstance.post(DotzBaseUrlV1+'/product/brands/',values)
      }
      if (response.data.status === 1000){
          toast.success(response.data.message)
          setModalOpen(false)
          if(EditingCategoryId){
            const updatedCategories = data.map((category) =>
              category.id === EditingCategoryId? {...category, name: values.brand_name, description: values.description } : category
            );
            setData(updatedCategories);
          }else{
            const newCategory = { id: response.data.data, name: values.brand_name, description: values.description }
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
                title="Delete the brand"
                description="Are you sure to delete this brand?"
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
      setModalOpen(true)
    };

    const deleteItem = async (uuId) => {
        console.log('delete uuId:', uuId);
        const values = {pk: uuId}
        // const response = await axiosInstance.delete(DotzBaseUrlV1+'/product/categories/',values);
        const response = await axiosInstance.delete(DotzBaseUrlV1 + '/product/brands/', {
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
      setModalOpen(true)
  }
  const fetchCategories = async (searchTerm) => {
    try {
      const payload = {
        search: searchTerm,
        is_search:true,
        organization: organizationDetails.id,
      }
      const response = await axiosInstance.post(`${DotzBaseUrlV1}/product/brands/`,payload)
      
      if (response.data.status === 1000){
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };


    
    const fetchInitial = async () =>{
      const response = await axiosInstance.get(`${DotzBaseUrlV1}/product/brands/${organizationDetails.id}`)
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
        <Title level={4}>Product Brands</Title>
        <Divider />

        <Flex gap="small" justify='space-between' wrap="wrap">

        <Search style={{width:'50%'}} placeholder="Search brands" onSearch={onSearch} onBlur={onDelySearch} enterButton allowClear/>
        <div> 
          <Button onClick={() => {handleCreate()}} className='ml-10' type="primary" shape="round" icon={<PlusCircleOutlined />} >
            Create Brand
          </Button>
        </div>
          </Flex>

        <Divider />

        <Table theme="dark" columns={columns} dataSource={data} />

        {/* --------- MODALS ------ */}
        <Modal
                title={EditingCategoryId ? "Edit Brand" : "Create a new Brand"}
                centered
                open={categoryModalOpen}
                // onOk={createBrand()}
                // okText='Create'
                onCancel={() => setModalOpen(false)}
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
                    name="brand_name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your brand name!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
                    {EditingCategoryId &&
                      <Form.Item
                      label="Brand Code"
                      name="brand_code"
                      rules={[
                          {
                          required: true,
                          message: 'Please input your brand code!',
                          },
                      ]}
                      >
                      <Input readOnly />
                      </Form.Item>
                    }

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

export default BrandList