import React from 'react'
import { Link } from 'react-router-dom'
import './style/ProductItem.css'
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai'
import FormatPrice from '../Utils/FormatPrice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


function ProductItem(props) {


    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handlePressAddToCart = () => {

        if (user.Id === null) {
            toast.warn('You need to login to make a purchase!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }

        dispatch({
            type: 'CART_ADD',
            productId: props.id,
            productName: props.name,
            productQuantity: 1,
            productImage: props.image,
            productPrice: props.price,
            productDiscount: props.discount

        })
        toast.success('Product added to cart!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const newPrice = Number(props.price) - Number(props.price) * (Number(props.discount) / 100)

    return (
        <div className='product-items'>
            <div className='single-product'>
                <div className='single-product-top'>
                    {
                        props.discount > 0 && <span className='label_discount'>-{props.discount}%</span>
                    }

                    <div className='action-link'>
                        <div>
                            <li>
                                <button onClick={handlePressAddToCart}>
                                    <AiOutlineShoppingCart />
                                </button>
                            </li>
                            <li>
                                <button>
                                    <AiOutlineHeart />
                                </button>
                            </li>
                        </div>
                    </div>
                    <img src={`/wwwroot/images/${props.image}`} alt='' />

                </div>
                <div className='single-product-bottom text-center'>
                    <p>⭐⭐⭐⭐⭐</p>
                    <Link className='link-product-detail text-uppercase' to={`/product-detail/${props.id}`}>{props.name}</Link>
                    <p className='price_product'>
                        {
                            props.discount > 0 ?
                                <>
                                    {FormatPrice(newPrice)} VND
                                    {' '}<span>{FormatPrice(props.price)} VND</span>
                                </>
                                : <>{FormatPrice(props.price)} VND</>

                        }
                        {/* {' '}<span>200.000 VND</span> */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
