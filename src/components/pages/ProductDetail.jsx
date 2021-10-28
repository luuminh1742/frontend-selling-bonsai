import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import productApi from '../../api/productApi';
import Banner from '../Banner';
import ProductDescription from '../ProductDetail/ProductDescription';
import ProductReview from '../ProductDetail/ProductReview';
import '../style/ProductDetail.css'
import FormatPrice from '../../Utils/FormatPrice'
import imgLoad from '../../assets/img/loading.gif'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

function ProductDetail() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [productInfoButton, setProductInfoButton] = useState(1)
    let { id } = useParams()
    const [loadData, setLoadData] = useState(true)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const getProductDetail = async () => {
        try {
            setLoadData(true)
            let resp = await productApi.getOne(id)
            setProduct(resp)
        } catch (e) {

        } finally {
            setLoadData(false)
        }
    }

    const onChangeQuantity = e => {
        setQuantity(Number(e.target.value))
    }


    const handleAddToCart = () => {
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
            productId: product.Id,
            productName: product.Name,
            productQuantity: quantity,
            productImage: product.Image,
            productPrice: product.Price,
            productDiscount: product.Discount

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

    useEffect(() => {
        getProductDetail()
    }, [])




    return (
        <>
            <Banner name='Product detail' />
            <div className='pt-5 pb-5 mb-5 mt-5'>
                <Container>
                    {
                        loadData ?
                            <Row className='d-flex justify-content-center'>
                                <img src={imgLoad} alt='imgLoad'
                                    style={{ width: 300 }}
                                />
                            </Row>
                            :
                            <>

                                <Row>
                                    <Col md={6}>
                                        <img
                                            className='img_product'
                                            src={`/wwwroot/images/${product.Image}`}
                                            alt='img'
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <h3>
                                            {product.Name.toUpperCase()}
                                            {
                                                product.Discount > 0 &&
                                                <span
                                                    style={{
                                                        background: '#e54949',
                                                        color: '#fff',
                                                        padding: '3px 10px',
                                                        marginLeft: 10,
                                                        borderRadius: 10,
                                                        fontSize: 17
                                                    }}
                                                >- {product.Discount} %</span>
                                            }
                                        </h3>
                                        <p>⭐⭐⭐⭐⭐</p>
                                        <p className='price-new'>
                                            {
                                                product.Discount > 0 ?
                                                    <>
                                                        {FormatPrice(product.Price * (100 - product.Discount) / 100)} VND
                                                        <span className='price-old'>{FormatPrice(product.Price)} VND</span>
                                                    </>
                                                    :
                                                    <>
                                                        {FormatPrice(product.Price)} VND
                                                    </>
                                            }

                                        </p>
                                        <div className='d-flex'>
                                            <div className='d-flex'>
                                                <span>Quantity</span>
                                                <input
                                                    className='form-control'
                                                    type='number'
                                                    placeholder='1'
                                                    style={{ width: 75, marginLeft: 10 }}
                                                    defaultValue={1}
                                                    onChange={onChangeQuantity}
                                                    min="1" max="10"
                                                />
                                            </div>
                                            <button
                                                onClick={handleAddToCart}
                                                style={{
                                                    border: 0,
                                                    backgroundColor: '#79a206',
                                                    color: '#fff',
                                                    padding: '10px 20px',
                                                    borderRadius: 10,
                                                    textDecoration: 'none',
                                                    marginLeft: 10
                                                }}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                        <div className='mt-4'>{product.ShortDescription}</div>
                                    </Col>
                                </Row>
                                <Row className='mt-5 mb-5 pt-5 '>
                                    <Col lg={12}>
                                        <div className='border'>
                                            <div className='product_info_button d-flex flex-row'>
                                                <p
                                                    className={productInfoButton === 1 && 'product_info_button_active'}
                                                    onClick={() => setProductInfoButton(1)}
                                                >
                                                    Description
                                                </p>
                                                <p
                                                    className={productInfoButton === 2 && 'product_info_button_active'}
                                                    onClick={() => setProductInfoButton(2)}
                                                >
                                                    Review
                                                </p>
                                            </div>
                                            <div className='p-3'>
                                                {
                                                    productInfoButton === 1 ?
                                                        <ProductDescription
                                                            content={product.ProductDetail}
                                                        />
                                                        : <ProductReview />
                                                }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </>


                    }


                </Container>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </>
    )
}
export default ProductDetail
