"use client"
import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Input, Popconfirm, Select, Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
// import useAxios from '../../utils/useAxios';
// import { dotzURL } from '../../utils/apiConfig';



const PurchaseDetails = (props) => {
  const api = "useAxios()"
  const orgId = "JSON.parse(localStorage.getItem('orgs_dts')).id;"

  const [productOptions, setProductOptions] = useState([]);
  const [serachedProducts, setSerachedProducts] = useState([]);
  const [count, setCount] = useState(2);

  
  console.log("dataSource====>>000>>",props.dataSource);

  const handleDelete = (key) => {
    const newData = props.dataSource.filter((item) => item.key !== key);
    props.setDataSource(newData);
  };

  const handleChange = (value, option, record, name) => {
    const updatedData = props.dataSource.map(item => {
      console.log("value===>",value);
      console.log("name===>",name);
      console.log("option===>",option);
      console.log("record===>",record);

    //   if (item.key === record.key) {
    //     if (name === 'name'){
    //       console.log("serachedProducts====>",serachedProducts);
    //       const selectedProduct = serachedProducts.find(i => i.product_id === option.key);
    //       console.log("selectedProduct====>",selectedProduct);
    //       const selectedTax = props.taxes.find(tax => tax.key === selectedProduct.tax);
    //       return { ...item, [name]:value, price:selectedProduct?.price, tax:selectedTax}
    //     }else if( name === 'name_change'){
    //       return { ...item, name:value}
    //     }else if(name === 'tax'){
    //       console.log("\n\nTAX\n\n");
    //       const selectedTax = props.taxes.find(tax => tax.key === option.key);
    //       console.log("selectedTax==>",selectedTax);
    //       console.log("\n\nTAX\n\n");
    //       return { ...item, tax:selectedTax}
    //     }
    //     else{
    //       return { ...item, [name]: value };
    //     }
    //   }
      return item;
    });
    props.setDataSource(updatedData);
  };

  const renderTitle = () => (
    <span style={{display:'flex',justifyContent:'space-between'}}>
      {/* {title} */}
      {/* <a
        style={{
          float: 'right',
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a> */}
      <span>Product Name</span>
      <span>Stock</span>
      <span>Price</span>
    </span>
  );
  const renderItem = (product_id ,title, count,price) => ({
    key:product_id,
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
           {count}
        </span>
        <span>
           {price}
        </span>
      </div>
    ),
  });

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      width: '30%',
      render: (_, record) => (
        <AutoComplete
          style={{ width: '100%' }}
          options={productOptions}
          placeholder="Select a product"
          value={record.name}
          bordered={false}
          allowClear
          backfill
          defaultActiveFirstOption
          onChange={(value,option) => handleChange(value,option, record, 'name_change')}
          onSelect={(value,option) => handleChange(value,option, record, 'name')}
          onSearch={(value) => handleProductSearch(value, record)}

        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, record) => (
        <Input placeholder="Price" value={record.price} bordered={false} type='number' 
        onChange={(e,option) => handleChange(e.target.value,option, record, 'price')}
        />
      )
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      render: (_, record) => (
        <Input placeholder="Qty" value={record.qty} bordered={false} type='number' 
        onChange={(e,option) => handleChange(e.target.value,option, record, 'qty')}
        />
      ),
      responsive: ['md'],
    },
    // {
    //   title: 'Free Qty',
    //   dataIndex: 'f_qty',
    //   render: (_, record) => (
    //     <Input placeholder="Free Qty" value={record.f_qty} bordered={false} type='number' 
    //     onChange={(e,option) => handleChange(e.target.value,option, record, 'fqty')}
    //     />
    //   )
    // },
    {
      title: 'Tax',
      dataIndex: 'tax',
      render:(_,record) => (
        <Select
        bordered={false}
        defaultActiveFirstOption
        // value={props.taxes[0].value}
        value={record.tax.label}
        // defaultValue="lucy"
        style={{
          width: 120,
        }}
        // onChange={handleChange}
        onChange={(e,option) => handleChange(e,option, record, 'tax')}
        options={props.taxes}
      />
      )
    },
    {
      title: 'Tax Amount',
      dataIndex: 'tax_amount',
      width: '10%',
      render: (_, record) => (
        record.price * record.qty * record.tax.value / 100
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '10%',
      render: (_, record) => (
        (record.qty * record.price) + (record.price * record.qty * record.tax.value / 100)
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width:'5%',
      render: (_, record) =>
      props.dataSource.length >= 1 ? (
          <div style={{textAlign:'center'}}>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a><DeleteFilled style={{ fontSize: '16px', color: '#08c' }}/></a>
          </Popconfirm>
          </div>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: '',
      price: 0,
      qty: 1,
      f_qty: 0,
      tax:{key:null,value:0,label:'None'},
      amount: 0,
    };
    // const generateDataList = (count) => {
    //   return Array.from({ length: 500 }, (_, index) => ({
    //     key: count+index,
    //     name: 'Product '+count+index,
    //     price: parseFloat(count+index),
    //     qty: 1,
    //     f_qty: 0,
    //     tax:{value:5,id:count+1000+index},
    //     amount: parseFloat(count+index),
    //   }));
    // };
    // const dataList = generateDataList(count);
    // console.log("dataList=123=>",dataList);
    // props.setDataSource(dataList);
    props.setDataSource([...props.dataSource, newData]);
    setCount(count + 1);
  };

  const handleProductSearch = (value, record) => {
    fetchProducts(value).then((data) => {
      setSerachedProducts(data)
      if (data.length === 0) {
        setProductOptions([{ label: 'No results found', options: [] }]);
      }
      else{
        const fetchedOptions = data.map((item) => renderItem(item.product_id ,item.name, item.stock, item.price));
       console.log("fetchedOptions=====>",data);
        setProductOptions([
          {
          label: renderTitle(),
          options: fetchedOptions
          }
        ])
      }
    })

    const selectedProduct = productOptions.find(option => option.productName === value);
    if (selectedProduct) {
      const updatedDataSource = [...props.dataSource];
      const recordIndex = updatedDataSource.findIndex(item => item.key === record.key);
    if (recordIndex !== -1) {
      updatedDataSource[recordIndex] = {
        ...updatedDataSource[recordIndex],
        qty: selectedProduct.price,
      };
      props.setDataSource(updatedDataSource);
    }
    }
  };


// =====UseEffects======
  useEffect(() => {
    // Simulate an API call to fetch product options
    // fetchProducts().then(data => setProductOptions(data));
  }, []);

  // useEffect(() => {
  //   const newTotalPrice = props.dataSource.reduce((total, item) => {
  //     const itemPrice = (parseFloat(item.price) || 0) * (parseFloat(item.qty) || 0);
  //     return total + itemPrice;
  //   }, 0);
  // }, [props.dataSource]);

  // ===== APIS=======
  const fetchProducts = async (value) => {
    // const payload = {
    //   search : value,
    //   organization_id: orgId
    // }
    // const response = await api.post(`${dotzURL}product/product-list/`,payload );
    // console.log("response===>",response.data.data);
    // return response.data.data;
    // return [
    //   { productName: 'Product 1', stock: 10, price: 20 },
    //   { productName: 'Product 2', stock: 5, price: 15 },
    //   { productName: 'Product 3', stock: 20, price: 30 },
    // ]; // Mocked data
  };
 
  return (
    <div>
      <Table
        // components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={props.dataSource}
        columns={columns}
        pagination={false}

      />
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 10, marginTop: 10
        }}
      >
        Add a row
      </Button>
    </div>
  );
};
export default PurchaseDetails;
