import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import imgEmptyCart from '../../assets/img/empty-cart.png'
import FormatPrice from '../../Utils/FormatPrice'
import { BsTrashFill } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

function Cart() {


    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleDeleteItemInCart = id => {
        dispatch({
            type: 'CART_DELETE_ITEM',
            productId: id
        })
        toast.info('Product removed from cart', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handleChangeQuantity = (id, quantity) => {
        if (quantity < 1) {
            handleDeleteItemInCart(id)
        } else {
            dispatch({
                type: 'CART_UPDATE',
                productId: id,
                productQuantity: quantity
            })
        }

    }

    useEffect(() => {
        document.title = 'Cart | X-BONSAI'
    }, [])



    return (
        <div className='pt-5 pb-5 mb-5 mt-5'>
            {
                cart.products.length === 0 ?
                    <Container className='d-flex justify-content-center flex-column text-center'>
                        <div className='text-center'>
                            <img
                                src={imgEmptyCart}
                                alt='img'
                                style={{ width: 'fit-content' }}
                            />
                        </div>

                        <h2>Empty cart</h2>
                    </Container>
                    :
                    <Container>
                        <table class="table table-bordered table-hover">
                            <thead class="bg-dark text-white table-hover">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    cart.products.map((item, index) => {
                                        return (
                                            <tr key={index}>

                                                <td>
                                                    <img
                                                        src={`/wwwroot/images/${item.image}`}
                                                        alt='img'
                                                        width={100}
                                                        height={100}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <input
                                                        type='number'
                                                        className='form-control'
                                                        style={{ width: 100 }}
                                                        defaultValue={item.quantity}
                                                        min="0" max="10"
                                                        onChange={(event) => {
                                                            handleChangeQuantity(item.id, Number(event.target.value))
                                                        }}
                                                    />
                                                </td>
                                                <td>{FormatPrice(item.price)} VND</td>
                                                <td>{item.discount} (%)</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDeleteItemInCart(item.id)}
                                                        className='border-0 rounded-circle'
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            fontSize: 22
                                                        }}
                                                    >
                                                        <BsTrashFill className='text-danger' />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                        <Row>
                            <Col md={6}>

                            </Col>
                            <Col md={6}>
                                <Card>
                                    <CardBody className='bg-dark text-white'>
                                        <CardTitle tag="h5">CART TOTAL</CardTitle>
                                    </CardBody>
                                    <CardBody>
                                        <div className='d-flex justify-content-between'>
                                            <h6>Subtotal</h6>
                                            <h6>{FormatPrice(cart.subtotal(cart.products))} VND</h6>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <h6>Shipping</h6>
                                            <h6>30.000 VND</h6>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-between'>
                                            <h6>Total</h6>
                                            <h6>{FormatPrice(cart.total(cart.subtotal(cart.products), cart.shipping))} VND</h6>
                                        </div>
                                        <div className='d-flex justify-content-end mt-2'>
                                            <Link
                                                to='/shop'
                                                style={{
                                                    border: 0,
                                                    backgroundColor: '#000',
                                                    color: '#fff',
                                                    padding: '10px 20px',
                                                    borderRadius: 10,
                                                    marginRight: 5,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Continue shopping
                                            </Link>
                                            {' '}
                                            <Link
                                                to='/checkout'
                                                style={{
                                                    border: 0,
                                                    backgroundColor: '#79a206',
                                                    color: '#fff',
                                                    padding: '10px 20px',
                                                    borderRadius: 10,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Process to checkout
                                            </Link>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Container>
            }
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
        </div>
    )
}

export default Cart
