"use client";
import { Rate } from 'antd';
import { useCallback, useEffect, useState } from 'react'
import SetColor from './SetColor';
import SetQty from './SetQty';
import NButton from '../../../../../components/NButton';
import ProductImage from './ProductImage';
import { useCart } from '@/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md'
import { useRouter } from 'next/navigation';

const ProductDetails = ({product, shopname}) => {
    // const shopname = 'nfoursquare';
  
    const {handleAddProductToCart, cartProducts} = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    const [cartProduct, setCartProduct] = useState({
        id: product.id,
        name: product.name,
        description: product.description,
        category :product.category,
        brand: product.brand,
        selectedImg: {...product?.images[0]},
        selectedVariant: {...product?.variants[0]},
        qty: 1,
        price: product.price
    })
    const router = useRouter()
    console.log("cartProducts====>",cartProducts);

    useEffect(() => {
      setIsProductInCart(false)
    
      if(cartProducts){
        const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
        if(existingIndex > -1){
            setIsProductInCart(true)
        }
      }
    }, [cartProducts])
    
    // const handleColorSelect = useCallback((value) => {
    //     setCartProduct((prev) => {
    //         return {...prev, selectedImg:value};
    //     });
    // }, [cartProduct.selectedImg])

    const handleVariantSelect = useCallback((value) => {
        console.log("value=vrt===>",value);
        
        setCartProduct((prev) => {
            return {...prev, selectedVariant:value};
        });
    }, [cartProduct.selectedVariant])

    const handleImageSelect = useCallback((value) => {
        setCartProduct((prev) => {
            return {...prev, selectedImg:value};
        });
    }, [cartProduct.selectedImg])
    
    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => {
            return {...prev, qty: prev.qty + 1}
        })
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.qty === 1){
            return;
        }else{
            setCartProduct((prev) => {
                return {...prev, qty: prev.qty - 1 }
            })
        }
    }, [cartProduct]);


  const Horizontal = () => {
    return <hr className='w-[30%] my-2' />
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        <ProductImage
            cartProduct={cartProduct}
            product={product}
            // handleColorSelect={handleColorSelect}
            handleImageSelect={handleImageSelect}
        />
        <div className='flex flex-col gap-1 text-slate-500 text-sm'>
            <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
            <div className='flex items-center gap-2'>
                <Rate value={product.rating} allowHalf disabled />
                <div>{33} reviews</div>
            </div>
            <Horizontal />
            <div className='text-justify'>{product.description}</div>
            <Horizontal />
            <div>
                <span className="font-semibold">CATEGORY: </span>
                {product.category}
            </div>
            <div>
                <span className="font-semibold">BRAND: </span>
                {product.brand}
            </div>
            <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>{product.inStock ? 'In stock' : 'Out of stock'}</div>
            <Horizontal />
            <SetColor
                    cartProduct={cartProduct}
                    // images={product.images}
                    variants={product.variants}
                    handleVariantSelect={handleVariantSelect}
                    disabled={isProductInCart}
                />
            <Horizontal />
            <SetQty
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
                disabled={isProductInCart}
            />
            {isProductInCart ? 
            <>
                <p className='mb-2 text-slate-500 flex items-center gap-1'>
                    <MdCheckCircle className='text-teal-400' size={20} />
                    <span>Product added to cart</span>
                </p>
                <div className='max-w-[300px]'>
                    <NButton label="View Cart" outline onClick={() => {router.push(`/in/${shopname}/cart`)}} />
                </div>
            </>:
            <>
                
                
                <Horizontal />
                <div className='max-w-[300px]'>
                    <NButton
                        label="Add To Cart"
                        onClick={() => handleAddProductToCart(cartProduct)}
                    />
                </div>
            </>
            }
        </div>
    </div>
  )
}

export default ProductDetails