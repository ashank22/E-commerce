import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../GlobalState';

const ProductPage = () => {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    const [detailProduct, setDetailProduct] = useState(null);
    const addCart=state.userAPI.addCart;
    useEffect(() => {
        if (params.id) {
            const foundProduct = products.find(product => product._id === params.id);
            if (foundProduct) setDetailProduct(foundProduct);
        }
    }, [params.id, products]);

    if (!detailProduct) return null;
    
    const { img, name, price } = detailProduct;

    return (
        <div className='bg-[#E5E5E5] h-full flex justify-center items-center p-4'>
            <div className='bg-white w-full max-w-4xl p-6 rounded-lg shadow-xl'>
                <div className='flex flex-row justify-between items-center'>
                    <img src={img} alt={name} className='w-1/2 h-auto object-cover rounded-lg' />
                    <div className='flex flex-col justify-center items-start w-1/2 pl-6'>
                        <h1 className='text-3xl font-semibold'>{name}</h1>
                        <h2 className='text-xl text-gray-700 mt-2'>{price}</h2>
                    </div>
                </div>
                <button className="bg-black text-white py-2 px-6 rounded-xl mt-4 w-full">
                    <Link to="/cart" onClick={()=>addCart(detailProduct)}>Buy Now</Link>
                </button>
            </div>
        </div>
    )
}

export default ProductPage;
