import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Col, Container, FormGroup, Label, Modal, ModalBody, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import FormatPrice from '../../Utils/FormatPrice'
import billApi from '../../api/billApi'
import billDetailApi from '../../api/billDetailApi'
import billStatusApi from '../../api/billStatusApi'
import imgLoad from '../../assets/img/loading.gif'
import imgTrue from '../../assets/img/true.png'

const ModalCheckoutSuccess = ({ modal, toggle,clearCart }) => {
    return (
        <>
            <Modal isOpen={modal} centered={true} size='lg'>
                <ModalBody className='p-4'>
                    <div className='d-flex justify-content-center'>
                        <img src={imgTrue} alt='img' style={{width:'50%'}}/>
                    </div>
                    <div style={{padding:'15px 20px'}}>
                        <h3 className='text-center'>Order Success</h3>
                        <h4 className='text-center'>
                            Thank you for your trust and purchase in our store. Have a good day!
                        </h4>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <Link onClick={()=>{
                            toggle()
                            clearCart()
                        }}
                            to='/shop'
                            style={{
                                background: '#6ac258',
                                textDecoration: 'none',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: 10
                            }}
                        >
                            Continue shopping
                        </Link>
                    </div>


                </ModalBody>

            </Modal>
        </>
    )
}


function Checkout() {

    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const [processCheckout, setProcessCheckout] = useState(false)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const clearCart = () => {
        dispatch({
            type: 'CART_DELETE_ALL'
        })
    }

    const createBill = async (data) => {
        try {
            setProcessCheckout(true)
            let resp = await billApi.create(data)
            createBillDetail(resp.Id)
            createBillStatus(resp.Id)
            toggle()
        } catch (e) {
            alert('Lỗi xử lý đơn hàng')
        } finally {
            setProcessCheckout(false)
        }
    }
    const createBillDetail = async (billId) => {
        try {
            let element = {}
            for (let i = 0; i < cart.products.length; i++) {
                element = cart.products[i]
                await billDetailApi.create({
                    ProductId: element.id,
                    BillId: billId,
                    ProductName: element.name,
                    Price: element.price,
                    Quantity: element.quantity,
                    Discount: element.discount,
                    Image: element.image
                })
            }
        } catch (e) {

        }
    }
    const createBillStatus = async (billId) => {
        try {
            const data = [
                {
                    StatusName: 'Chờ xác nhận',
                    Code: 0,
                    Status: false
                },
                {
                    StatusName: 'Đơn hàng đang giao',
                    Code: 1,
                    Status: false
                },
                {
                    StatusName: 'Giao hàng thành công',
                    Code: 2,
                    Status: false
                },
                {
                    StatusName: 'Hủy đơn hàng',
                    Code: -1,
                    Status: false
                },
            ]
            for (let i = 0; i < data.length; i++) {
                await billStatusApi.create({
                    BillId: billId,
                    ...data[i]
                })
            }


        } catch (e) {

        }
    }



    const onSubmit = (data) => {
        if (user.Id === null) {
            alert('Bạn cần đăng nhập để mua hàng')
            return
        }

        data.AccountId = user.Id
        data.Shipping = cart.shipping
        data.Subtotal = cart.subtotal(cart.products)
        data.Total = cart.total(cart.subtotal(cart.products), cart.shipping)
        createBill(data)


    }



    return (
        <div className='pt-5 pb-5 mb-5 mt-5'>
            {
                cart.products.length === 0 ? <Redirect to="/cart" /> : ''
            }
            <Container>
                <Row>
                    <Col md={6}>
                        <div>
                            <h5 className='bg-dark text-white p-3'>BILLING DETAILS</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup className='pt-3'>
                                    <Label>Name *</Label>
                                    <input className='form-control'
                                        {...register('RecipientName', {
                                            required: true,
                                            value: user.FullName !== null && user.FullName
                                        })}
                                    />
                                    {errors.RecipientName && <p className='text-danger'>Recipient name is required.</p>}
                                </FormGroup>

                                <FormGroup className='pt-3'>
                                    <Label>Phone *</Label>
                                    <input className='form-control'
                                        {...register('RecipientPhone', {
                                            required: true,
                                            value: user.Phone !== null ? user.Phone : ''
                                        })}
                                    />
                                    {errors.RecipientPhone && <p className='text-danger'>Recipient phone is required.</p>}
                                </FormGroup>
                                <FormGroup className='pt-3'>
                                    <Label>Address *</Label>
                                    <input className='form-control'
                                        {...register('RecipientAddress', {
                                            required: true,
                                            value: user.Address !== null ? user.Address : ''
                                        })}
                                    />
                                    {errors.RecipientAddress && <p className='text-danger'>Recipient address is required.</p>}
                                </FormGroup>
                                <FormGroup className='pt-3'>
                                    <Label>Note</Label>
                                    <textarea className='form-control'
                                        {...register('Note', { required: true })}
                                    ></textarea>
                                </FormGroup>
                                <FormGroup>
                                    <div className='d-flex justify-content-start mt-3'>
                                        <button
                                            type='submit'
                                            style={{
                                                border: 0,
                                                backgroundColor: '#79a206',
                                                color: '#fff',
                                                padding: '10px 20px',
                                                borderRadius: 10,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Process to pay
                                        </button>
                                        
                                    </div>
                                </FormGroup>
                            </form>
                        </div>

                    </Col>
                    <Col md={6}>

                        <div>
                            <h5 className='bg-dark text-white p-3'>YOUR ORDER</h5>
                            <table className='table'>
                                <thead className='bg-secondary text-white'>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                </thead>
                                <tbody>

                                    {
                                        cart.products.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>(x {item.quantity})</td>
                                                    <td>{FormatPrice(item.price)} VND</td>
                                                    <td>{item.discount} %</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr style={{ fontWeight: 'bold' }}>

                                        <td colSpan={2}>
                                            Subtotal

                                        </td>
                                        <td colSpan={2} style={{ textAlign: 'right' }}>
                                            {FormatPrice(cart.subtotal(cart.products))} VND
                                        </td>
                                    </tr>
                                    <tr style={{ fontWeight: 'bold' }}>

                                        <td colSpan={2}>
                                            Shipping
                                        </td>
                                        <td colSpan={2} style={{ textAlign: 'right' }}>
                                            {FormatPrice(cart.shipping)} VND
                                        </td>
                                    </tr>
                                    <tr style={{ fontWeight: 'bold' }}>

                                        <td colSpan={2}>
                                            Total
                                        </td>
                                        <td colSpan={2} style={{ textAlign: 'right' }}>
                                            {FormatPrice(cart.total(cart.subtotal(cart.products), cart.shipping))} VND
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <ModalCheckoutSuccess
                                modal={modal}
                                toggle={toggle}
                                clearCart={clearCart}
                            />

                        </div>
                    </Col>
                </Row>
                {
                    processCheckout ?
                        <div style={{ textAlign: 'center' }}>
                            <img src={imgLoad} alt='img' />
                        </div>
                        : ''
                }
            </Container>
        </div>
    )
}

export default Checkout
