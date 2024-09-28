"use client"
import { AutoComplete, Button, Col, DatePicker, Divider, Flex, Input, Row, Select, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import SalesDetails from './SalesDetails';
// import SalesInvoiceDetails from './SalesInvoiceDetails';
// import useAxios from '../../utils/useAxios';
// import { dotzURL } from '../../utils/apiConfig';
// import dayjs from 'dayjs';
const { Option } = Select;
const {TextArea} = Input;

const CreateSalesOrder = () => {
    const api = "useAxios()"
    // const organizationDetails = useSelector(state => state.organization_details);
    const orgId = "JSON.parse(localStorage.getItem('orgs_dts')).id;"
    const [loading, setLoading] = useState({isMain:false, isSave:false})

    // const [account_group, setAccount_group] = useState(null)
    // const [accountType, setAccountType] = useState(null)
    const [ledgerList, setLedgerList] = useState([])
    // const [searchParams, setSearchParams] = useSearchParams();
    // const ledgerId = searchParams.get('id')
    // const [form] = Form.useForm();
    // const newDate = new Date()
    console.log("orgId========;;;>",orgId);

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
        <span>Name</span>
        {/* <span>Code</span> */}
        <span>Balance</span>
      </span>
    );
    const renderItem = (ledger_id,ledger_code, name, balance) => ({
      key: ledger_id,
      value: name,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
             {name}
          </span>
          {/* <span>
          {ledger_code}
          </span> */}
          <span>
             {balance}
          </span>
        </div>
      ),
    });

    const handleSearch = (search, type) => {
        console.log("type====>",type);
        console.log("search====>",search);
        // if(type === 'ledger'){
        //   fetchLedger(search).then((data) =>{
        //     console.log("data--newone==>",data);
        //     const fetchedOptions = data.map((item) => renderItem(item.ledger_id, item.ledger_code, item.value, item.current_balance));
        //     setLedgerList([
        //       {
        //         label: renderTitle(),
        //         options: fetchedOptions
        //       }
        //     ])
        //   })
        // }
    }

    // const handleChangeLedger = async(value,option, name) => {
    //   // const updatedData = props.dataSource.map(item => {
    //     console.log("value===>",value);
    //     console.log("option===>",option);
    //     console.log("option.key===>",option.key);
    //     console.log("name===>",name);

    //     if (name === 'ledger'){
    //       const response = await api.post(`${dotzURL}ledger/ledger-basic/`,{organization:orgId,ledger_id:option.key})
    //       console.log("response---->",response.data.data);
    //       const ledgerData = response.data.data
    //       setState((prevState) => ({
    //         ...prevState,
    //         ledgerId: ledgerData.id,
    //         name: ledgerData.value,
    //         code : ledgerData.ledger_code,
    //         balance : ledgerData.current_balance
    //       }));
    //     }
    // };

    // const [initialValues, setInitialValues] = useState()
    // ==== Sales Details====
    const [taxes, setTaxes] = useState([
      {
        value: '00',
        label: 'None'
      },
    ])
    const dateFormat = 'YYYY-MM-DD';
    const today = '2024-03-03'
    const [state, setState] = useState(
      {
        date:today,
        voucherNo:1,
        description:null,
        cash_amount:0,
        cash_account:null,
        bank_amount:0,
        bank_account:null,
      }
    )
    const [dataSource, setDataSource] = useState([
      {
        key: '0',
        name: '',
        price: '',
        qty: 1,
        f_qty: 0,
        tax:{key:null,value:0,label:'None'},
        discount:0,
        amount: 0,
      },
    ]);
    console.log("state======>",state);
    console.log("ledgerList======>",ledgerList);

    // const fetchLedger = async (search) => {
    //   try {
    //     const response2 = await api.post(`${dotzURL}ledger/ledger-basic/`,
    //       {organization:orgId,
    //         ledger_id:state.ledgerId,
    //         search:search,
    //         from_type:'SI'
    //       }
    //     )
    //       if (response2.data.status === 1000){
    //         const ledgerData = response2.data.data
    //         return ledgerData
    //       }
    //   }catch (error) {
    //       console.log("ERROR:",error);
    //       message.error("Something went wrong! ERROR_CODE:CSI155")
    //   }
    // }
    const fetchInitial = async () => {
      try {
        //   const response1 = await api.get(`${dotzURL}main/generate-voucher/${orgId}/SI`)
        //   const taxes_response = await api.get(`${dotzURL}product/taxes/${orgId}`)
        //   const response2 = await api.post(`${dotzURL}ledger/ledger-basic/`,{organization:orgId,ledger_id:state.ledgerId})
        //   if (response1.data.status === 1000 && response2.data.status === 1000 && taxes_response.data.status === 1000){
        //     const ledgerData = response2.data.data
        //     const taxesData = taxes_response.data.data
        //     console.log("taxesData===>",taxesData);
        //     const formattedNewData = taxesData.map(item => ({
        //       value: item.sale_rate,
        //       label: item.name,
        //       key: item.id
        //     }));
        //     setTaxes(formattedNewData)
        //     // setLedgerList([
        //     //   {
        //     //     id: ledgerData.id,
        //     //     value: ledgerData.value,
        //     //     code : ledgerData.ledger_code,
        //     //     balance : ledgerData.current_balance
        //     //   }
        //     // ])
        //     console.log("ASDFGHJK=ledgerData==>",ledgerData);
        //     const fetchedOptions = renderItem(ledgerData.ledger_id,ledgerData.ledger_code, ledgerData.value, ledgerData.current_balance);
        //     console.log("ASDFGHJK===>",fetchedOptions);
        //     setLedgerList([
        //       {
        //         label: renderTitle(),
        //         options: [fetchedOptions]
        //       }
        //     ])
        //     setState((prevState) => ({
        //       ...prevState,
        //       voucherNo:response1.data.voucher_no,
        //       ledgerId: ledgerData.id,
        //       name: ledgerData.value,
        //       code : ledgerData.ledger_code,
        //       balance : ledgerData.current_balance
        //     }));
        //     // if (ledgerId){
        //     //     const response6 = await api.get(`${dotzURL}ledger/accounts/${organizationDetails.id}/${ledgerId}`)
        //     //     const result = response6.data.data
        //     //     console.log("result==code==>",result);
        //     //     let account_type = ''
        //     //     if (result.account_group_id === 10){
        //     //         account_type = 'customer'
        //     //     }else if (result.account_group_id === 11){
        //     //         account_type = 'supplier'
        //     //     }else{
        //     //         account_type = 'ledger'
        //     //     }
        //     //     setAccountType(account_type)
        //     //     setInitialValues({
        //     //         ...initialValues,
        //     //         account_type:account_type,
        //     //         ledger_code:result.ledger_code,
        //     //         is_active:result.is_active,
        //     //         opening_balance:result.opening_balance,
        //     //         phoneNumber:result.phoneNumber,
        //     //         email:result.email,
        //     //         name:result.name,
        //     //         tax_treatment:result.tax_treatment,
        //     //         tax_no:result.tax_no,
        //     //         description:result.description,
        //     //         country:result.country,
        //     //         state:result.state,
        //     //         building:result.building,
        //     //         city:result.city,
        //     //         street:result.street,
        //     //         city:result.city,
        //     //         pin:result.pin,
        //     //         account_group_id:result.account_group_id,
        //     //         Image:result.photo,
        //     //     })
        //     //     // form.setFieldsValue({ account_group_id: result.account_group_id });
        //     // }else{

        //     //     setInitialValues({
        //     //         ...initialValues,
        //     //         ledger_code:response1.data.data,
        //     //         // account_group_id:response2.data.data,
        //     //     })
        //     //     form.setFieldsValue({ ledger_code: response1.data.data });
        //     // }

        //     setLoading({...loading,isMain:false})
              
        //   }else{
        //       message.error('Something went wrong!')
        //   }
      } catch (error) {
          
      }
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    console.log("name==>",name);
    console.log("value==>",value);
    setState({...state, [name]:value})
  };

  const handleSubmit = async () => {
    let isValidation = true
    if (GrantTotal === 0){
      isValidation = false
      message.warning("Grant Total notbe Zero")
    }
    if (isValidation){
      setLoading({...loading,isSave:true})
      const payload = {
        organization: orgId,
        master: state,
        details: dataSource,
        totalTax:totalTax,
        totalGross:totalGross,
        totalQty:totalQty,
        roundOff:roundOff,
        discount:discount,
        GrantTotal:GrantTotal
      }
      const response = await api.post(dotzURL+`sales/sales_invoice/`, payload)
      const responseData = response.data.data
      if (responseData.status_code === 1000){

        message.success(responseData.message)
      }else if (responseData.status_code === 1001){
        message.warning(responseData.message)
      }else{
        message.error(responseData.message)

      }



    }
    console.log('state===>',state);
    console.log('dataSource===>',dataSource);
  };

    useEffect(() => {
      fetchInitial();
    //   if (ledgerId){
    //     fetchProduct()
    //   }
    }, []);

    // ==== Total Calculations ====
    const roundTo = (num, precision = 2) => {
      const factor = Math.pow(10, precision);
      return Math.round(num * factor) / factor;
    };
  
    const totalTax = roundTo(dataSource.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const qty = parseFloat(item.qty) || 0;
      const taxRate = parseFloat(item.tax.value) || 0;
  
      const taxAmount = (price * qty * taxRate / 100);
      return total + taxAmount;
    }, 0));
    // const totalTax = dataSource.reduce(())
    const totalGross = roundTo(dataSource.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0));
    // const total = totalGross - dataSource.reduce((total, item) => {
    //   return total + (item.discount || 0);
    // }, 0);
  
    const totalQty = dataSource.reduce((total, item) => {
      return total + parseFloat(item.qty || 0);
    }, 0);

    const discount = roundTo(dataSource.reduce((total, item) => {
      return total + (item.discount || 0);
    }, 0));

    // const netAmount = total - (discount || 0);
    const netAmount = (totalGross + totalTax) - discount
    const roundOff = roundTo(netAmount) - netAmount;

    const GrantTotal = netAmount + roundOff;

    const Remains = roundTo((parseFloat(state.cash_amount?state.cash_amount:0) + parseFloat(state.bank_amount?state.bank_amount:0)) - GrantTotal)
    // ==End Total Calculations ======

    const cash_paymentTypes = ['Cash In Hand', 'Office Cash']
    const selectAfterCash = (
      <Select defaultValue={cash_paymentTypes[0]}>
        {cash_paymentTypes.map((optionValue) =>
        <Option key={optionValue}>{optionValue}</Option>
        )}
      </Select>
    );
    const bank_paymentTypes = ['Bank', 'SBI', 'Federal Bank']
    const selectAfterBank = (
      <Select defaultValue={bank_paymentTypes[0]}>
        {bank_paymentTypes.map((optionValue) =>
        <Option key={optionValue}>{optionValue}</Option>
        )}
      </Select>
    );
  return (
    <>
    {loading.isMain ?
    <h1>Loading...</h1>
    :  
    <div>
      <Row gutter={16}>
        <Col sm={12}>
        <AutoComplete
            options={ledgerList}
            size="large"
            style={{
            width: '100%',
            }}
            onSearch={(text) => handleSearch(text, 'ledger')}
            onSelect={(value, option) => handleChange(value,option, 'ledger')}

            placeholder="Select Customer"
            defaultValue={state.name}
            autoFocus
            allowClear
        />
        <div style={{padding:'5px 10px',marginTop:'5px',width:'100%',border:'1px solid lightgray',borderRadius:'5px'}}>
          <div className='flex justify-between'><p>Customer Code:</p><p>{state.code}</p></div>
          <div className='flex justify-between'><p>VAT No:</p><p>{state.tax_no}</p></div>
          <div className='flex justify-between'><p>Phone No:</p><p>{state.ledger_phone}</p></div>
          <div className='flex justify-between'><p>Email:</p><p>{state.ledger_email}</p></div>
          <div className='flex justify-between'><p>Balance:</p><p>{state.balance}</p></div>
        </div>
        </Col>
        <Col sm={6}>
        {/* ---------------------- */}
        </Col>
        <Col sm={6} style={{textAlign:'right'}}>
            {/* <Space align="center">
                Due Date: <DatePicker />
            </Space>
            <Space align="center" className='mt-6'>
                Ref. No.: <Input  />
            </Space> */}
             <Space align="center">
                Voucher Date: <DatePicker />
                {/* <DatePicker defaultValue={dayjs(state.date, dateFormat)}/> */}
            </Space>
            <Space align="center" className='mt-6'>
                Voucher No: <Input value={state.voucherNo} readOnly />
            </Space>
        </Col>
      </Row>
      {/* <Divider/>
      <Row gutter={16}>
        <Col span={12}>
        <AutoComplete
            options={ledgerList}
            size="large"
            style={{
            width: 500,
            }}
            // onSelect={onSelectLedger}
            onSearch={(text) => handleSearch(text, 'ledger')}
            onSelect={(value, option) => handleChange(value,option, 'ledger')}

            placeholder="Select Customer"
            defaultValue={state.name}
            autoFocus
            allowClear
        />
        <div style={{padding:'5px',marginTop:'5px',lineHeight:'0.1',width:'60%',border:'1px solid lightgray',borderRadius:'5px'}}>
          <div className='flex justify-between'><p>Customer Code:</p><p>{state.code}</p></div>
          <div className='flex justify-between'><p>VAT No:</p><p>{state.tax_no}</p></div>
          <div className='flex justify-between'><p>Phone No:</p><p>{state.ledger_phone}</p></div>
          <div className='flex justify-between'><p>Email:</p><p>{state.ledger_email}</p></div>
          <div className='flex justify-between'><p>Balance:</p><p>{state.balance}</p></div>
        </div>
        </Col>
        <Col span={12} style={{textAlign:'right'}}>
        <div style={{padding:'5px',marginTop:'5px',lineHeight:'0.3',display:'inline-block',alignItems:'right',width:'60%',border:'1px solid lightgray',borderRadius:'5px'}}>
        <Button block>Change Address</Button>
          <div className='flex justify-between'><p>Customer Code:</p><p>CST353</p></div>
          <div className='flex justify-between'><p>VAT No:</p><p>3333333333333</p></div>
          <div className='flex justify-between'><p>Phone No:</p><p>+91 9072372023</p></div>
          <div className='flex justify-between'><p>Email:</p><p>muhammednashid.t@gmail.com</p></div>
        </div>
        </Col>
      </Row> */}
      <Divider />

      
      <SalesDetails taxes={taxes} dataSource={dataSource} setDataSource={setDataSource} />

      <Row gutter={25}>
        <Col span={12}>
          <div>
            <h3>Payment:</h3>
            <Input value={state.cash_amount} type='number' name='cash_amount' onChange={handleChange} addonBefore="Cash" placeholder='Cash Amount' addonAfter={selectAfterCash} className='mb-4' />
            <Input value={state.bank_amount} name='bank_amount' onChange={handleChange} addonBefore="Bank" placeholder='Bank Amount' addonAfter={selectAfterBank} />
          </div>
          <TextArea name='description' onChange={handleChange} style={{marginTop:'25px'}} placeholder="Notes..." autoSize={{minRows:3}} value={state.description} />


        </Col>
        <Col span={12}>
        {/* Total Tax Amount: 450
        Total Gross Amount: 3950
        Total Discount: 150
        Final Total Amount: 3800 */}
          <div style={{lineHeight:'2', fontSize:'16px'}}>
            <div className='flex justify-between'>
              <span>Total Qty:</span>
              <span>{totalQty}</span>
            </div>
            <div className='flex justify-between'>
              <span>Total Tax:</span>
              <span>{totalTax}</span>
            </div>
            <div className='flex justify-between'>
              <span>Total Gross:</span>
              <span>{totalGross}</span>
            </div>
            <div className='flex justify-between'>
              <span>Total Discount:</span>
              <span>{discount}</span>
            </div>
            <div className='flex justify-between'>
              <span>Round off:</span>
              <span><Input bordered={false} value={roundOff} style={{textAlign:'right',fontSize:'16px', padding:'0'}}/> </span>
            </div>
            <div className='flex justify-between' style={{fontWeight:'600'}}>
              <span>Grant Total:</span>
              <span>{GrantTotal}</span>
            </div>
            {Remains !==0 &&
            <div className='flex justify-between' style={{color:'gray'}}>
              <span> Change </span>
              <span>{-Remains}</span>
            </div>
            }
          </div>

        </Col>
      </Row>


      <div className="fixed-bottom" style={{padding:'7px'}}>
            <Flex gap="middle" align="center" justify='center'>
              <Button  shape="round"  // icon={<DownloadOutlined />}
              size={'large'} danger type='dashed'>Clear</Button>
              <Button  shape="round"  // icon={<DownloadOutlined />}
              size={'large'}>Import/Export</Button>
              {/* <Button  shape="round"  // icon={<DownloadOutlined />}
              size={'large'}>Export </Button> */}
              <Button type="primary" shape="round" className='btn-std'// icon={<DownloadOutlined />}
              size={'large'}>Save & Print </Button>
              <Button type="primary" shape="round"  block onClick={handleSubmit}
              size={'large'}>Save </Button>
            </Flex>
      </div>
    </div>
    }
    </>
  );
}

export default CreateSalesOrder;
