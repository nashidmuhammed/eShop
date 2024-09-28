import React, { useEffect, useState } from 'react'

const ProductCardList = ({organization_id, setLoader}) => {
    const [productData, setProductData] = useState([])

    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await fetch(`${EshopBaseUrlV1}/products/new-products/`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ organization_id: organization_id })
                    }
                );
                const data = await response.json();
                if (data.status === 1000){
                    setProductData(data.data);
                }else{
                    console.error('Error fetching sliders:', data.message);
                }
            } catch(e){
                console.error('Error fetching sliders:', e);
                // toast.error("Some error occurred while fetching sliders");
            }
        }
      fetchNewProducts();
    }, [organization_id])
  return (
    <div>
        <div className="bg-gray-100 w-full min-h-screen gap-6 flex-wrap flex justify-center items-center">
        {/* <!-- card1 --> */}
        <div
            className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src="images/a-white-background-makes-your-product-stand-out.webp" alt=""
                className="h-40 object-cover rounded-xl " />
            <div className="p-2">
                <h2 className="font-bold text-lg mb-2">Heading</h2>
                <span className="text-xl font-semibold">Rs. 1800.00</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm line-through opacity-75">Rs. 2000.00</span>
                    <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600">Save 10%</span>
                </div>
                <div className="flex items-center mt-2 gap-1">
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <p className="font-bold text-xs text-gray-700">Best Ratings</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 mb-2">Beautiful Animated Card Design Using Tailwind CSS. Subscribe
                    to My Youtube Channel for more...</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
                <button className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 font-semibold">Buy Now</button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/shopping-cart.png" alt="" className="w-6" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/love.png" alt="" className="w-6" />
                </button>
            </div>

        </div>
        {/* <!-- card1 -->
        <!-- card2 --> */}
        <div
            className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src="images/51200638532_52a17c552a_b.jpg" alt="" className="h-40 object-cover rounded-xl " />
            <div className="p-2">
                <h2 className="font-bold text-lg mb-2">Heading</h2>
                <span className="text-xl font-semibold">Rs. 1800.00</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm line-through opacity-75">Rs. 2000.00</span>
                    <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600">Save 10%</span>
                </div>
                <div className="flex items-center mt-2 gap-1">
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <p className="font-bold text-xs text-gray-700">Best Ratings</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 mb-2">Beautiful Animated Card Design Using Tailwind CSS. Subscribe
                    to My Youtube Channel for more...</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
                <button className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 font-semibold">Buy Now</button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/shopping-cart.png" alt="" className="w-6" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/love.png" alt="" className="w-6" />
                </button>
            </div>

        </div>
        {/* <!-- card2 -->
        <!-- card3 --> */}
        <div
            className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src="images/main-qimg-477715cd9204d39855a11b2c789aac29-lq.jpeg" alt=""
                className="h-40 object-cover rounded-xl " />
            <div className="p-2">
                <h2 className="font-bold text-lg mb-2">Heading</h2>
                <span className="text-xl font-semibold">Rs. 1800.00</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm line-through opacity-75">Rs. 2000.00</span>
                    <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600">Save 10%</span>
                </div>
                <div className="flex items-center mt-2 gap-1">
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <p className="font-bold text-xs text-gray-700">Best Ratings</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 mb-2">Beautiful Animated Card Design Using Tailwind CSS. Subscribe
                    to My Youtube Channel for more...</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
                <button className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 font-semibold">Buy Now</button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/shopping-cart.png" alt="" className="w-6" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/love.png" alt="" className="w-6" />
                </button>
            </div>

        </div>
        {/* <!-- card3 -->
        <!-- card4 --> */}
        <div
            className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src="images/sport-shoe-white-background.jpeg" alt="" className="h-40 object-cover rounded-xl " />
            <div className="p-2">
                <h2 className="font-bold text-lg mb-2">Heading</h2>
                <span className="text-xl font-semibold">Rs. 1800.00</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm line-through opacity-75">Rs. 2000.00</span>
                    <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600">Save 10%</span>
                </div>
                <div className="flex items-center mt-2 gap-1">
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <p className="font-bold text-xs text-gray-700">Best Ratings</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 mb-2">Beautiful Animated Card Design Using Tailwind CSS. Subscribe
                    to My Youtube Channel for more...</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
                <button className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 font-semibold">Buy Now</button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/shopping-cart.png" alt="" className="w-6" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/love.png" alt="" className="w-6" />
                </button>
            </div>

        </div>
        {/* <!-- card4 -->
        <!-- card5 --> */}
        <div
            className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
            <img src="images/render_00003.jpg" alt="" className="h-40 object-cover rounded-xl "/>
            <div className="p-2">
                <h2 className="font-bold text-lg mb-2">Heading</h2>
                <span className="text-xl font-semibold">Rs. 1800.00</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm line-through opacity-75">Rs. 2000.00</span>
                    <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600">Save 10%</span>
                </div>
                <div className="flex items-center mt-2 gap-1">
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <img src="images/star.png" alt="" className="w-5" />
                    <p className="font-bold text-xs text-gray-700">Best Ratings</p>
                </div>

                <p className="text-sm text-gray-600 mt-2 mb-2">Beautiful Animated Card Design Using Tailwind CSS. Subscribe
                    to My Youtube Channel for more...</p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
                <button className="px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500 font-semibold">Buy Now</button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/shopping-cart.png" alt="" className="w-6" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-500">
                    <img src="images/love.png" alt="" className="w-6" />
                </button>
            </div>

        </div>
        {/* <!-- card5 --> */}

       </div>
    </div>
  )
}

export default ProductCardList