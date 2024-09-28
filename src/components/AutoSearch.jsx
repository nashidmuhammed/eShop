"use client";
import Slider from 'react-slick';
import Slide from './Slide';
import { EshopBaseUrlV1 } from '@/utils/GlobalVariables';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AutoComplete, Input } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AutoSearch = ({search}) => {
    const router = useRouter()
    const organizationDetails = JSON.parse(localStorage.getItem('organizationDetails'));
    const [query, setQuery] = useState("")

    // const [sliderData, setSliderData] = useState([])

    useEffect(() => {
        setQuery(search)
    }, [search])
    // console.log("SliderData===>",sliderData);

    const [options, setOptions] = useState([]);
    // const handleSearch = (value) => {
    //     setOptions(value ? searchResult(value) : []);
    // };
    // const onSelect = (value) => {
    //     console.log('onSelect', value);
    // };
    const handleSearch = (value) => {
        console.log("handleSearch", value);
        
        if (value) {
          axios.get(`${EshopBaseUrlV1}/products/search/?s=${organizationDetails.shopname}&q=${value}`).then((response) => {
            const options = response.data.data.map((product) => ({
              key: product.id,
              value: product.name,
              label: product.name,
            }));
            setOptions(options);
          });
        } else {
          setOptions([]);
          router.push(`/in/${organizationDetails.shopname}/explore?q=${value}`)
        }
      };
    
      const onSelect = (value) => {
        router.push(`/in/${organizationDetails.shopname}/explore?q=${value}`)
        // router.push(`/products?search=${value}`);
      };
      const handleSubmit = (value) => {
        toast.success(value)
        // router.push(`/in/${organizationDetails.shopname}/explore?q=${value}`)
        // router.push(`/products?search=${value}`);
      };
    

  return (
    <div className='container'>
        <AutoComplete
            popupMatchSelectWidth={252}
            // value={query}
            defaultValue={search}
            style={{
                width: "100%",
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            size="large"
            allowClear
            >
            <Input size="large" placeholder="Search here"  />
        </AutoComplete>
    </div>
  )
}

export default AutoSearch