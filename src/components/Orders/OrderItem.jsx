import React, { useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import FormatPrice from '../../Utils/FormatPrice'
import imgLoading from '../../assets/img/loading.gif'
import billStatusApi from '../../api/billStatusApi'
import { Link } from 'react-router-dom'


const ModalBillDetail = ({ toggle, modal, data }) => {
    return (
        <Modal isOpen={modal} toggle={toggle} centered={true} size='lg'>
            <ModalHeader >Bill Detail</ModalHeader>
            <ModalBody>
                <ul>
                    {
                        data.BillStatus.map(item => {
                            if (item.Status) {
                                return (
                                    <li key={item.Id} className={''}>
                                        {item.Status ? '✅' : '❎'} {item.ModifiedDate} - {item.StatusName}
                                    </li>
                                )

                            }
                            return null
                        })
                    }
                </ul>
                <hr />
                <h5>BILLING DETAILS</h5>
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <td>Recipient Name</td>
                            <td>{data.RecipientName}</td>
                        </tr>
                        <tr>
                            <td>Recipient Phone</td>
                            <td>{data.RecipientPhone}</td>
                        </tr>
                        <tr>
                            <td>Recipient Address</td>
                            <td>{data.RecipientAddress}</td>
                        </tr>
                        <tr>
                            <td>Note</td>
                            <td>{data.Note}</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <h5>YOUR ORDER</h5>

                <table className='w-100 table table-hover'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.BillDetails.map(billDetail => {
                                return (
                                    <tr key={billDetail.Id}>
                                        <td>
                                            <img
                                                src={`/wwwroot/images/${billDetail.Image}`}
                                                alt='img'
                                                width={100}
                                                height={100}
                                            />
                                        </td>
                                        <td>
                                            {billDetail.ProductName}
                                        </td>
                                        <td>x{billDetail.Quantity}</td>
                                        <td>
                                            {FormatPrice(billDetail.Price)} VND
                                        </td>
                                        <td>
                                            {billDetail.Discount} %
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <td></td>
                            <td></td>
                            <td>Subtotal: {FormatPrice(data.Subtotal)} VND</td>
                            <td>Shipping: {FormatPrice(data.Shipping)} VND</td>
                            <td>Total: {FormatPrice(data.Total)} VND</td>
                        </tr>
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Print</Button>{' '}
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}



function OrderItem({ listBill, loadOrder }) {


    const [dataPreview, setDataPreview] = useState(null)
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    const cancelOrder = async (billId) => {
        try {
            let params = {
                billId: billId,
                status: true,
                code: "0"
            }
            let resp = await billStatusApi.update(params)

            if (resp) {
                alert('Canceled order successfully')
            } else {
                alert('Canceling failed order')
            }

        } catch (e) {
            alert('Error')
        }
    }

    const handleCancelOrder = (id) => {
        cancelOrder(id)
    }


    const statusBillNow = (BillStatus) => {

        let data = {}
        for (let i = BillStatus.length - 1; i >= 0; i--) {
            if (BillStatus[i].Status) {
                data = BillStatus[i]
                break
            }
        }

        return (
            <>
                <span>
                    {data.StatusName} - {data.ModifiedDate}
                </span>
            </>
        )

    }

    return (
        <>
            {
                loadOrder ?
                    <>
                        <Row className='d-flex justify-content-center'>
                            <img src={imgLoading} alt='loading' style={{ width: 'auto' }} />
                        </Row>
                    </> :
                    listBill.map(item => {
                        return (
                            <Row className='rounded border p-3 mb-2' key={item.Id}>
                                <Col md={12}>
                                    <div className='d-flex justify-content-between'>
                                        <span>
                                            Order date {item.BillStatus[0].ModifiedDate}
                                        </span>
                                        <span>
                                            {

                                                statusBillNow(item.BillStatus)
                                            }
                                        </span>
                                    </div>
                                    <hr />
                                    <table className='w-100 table table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.BillDetails.map(billDetail => {
                                                    return (
                                                        <tr key={billDetail.Id}>
                                                            <td>
                                                                <img
                                                                    src={`/wwwroot/images/${billDetail.Image}`}
                                                                    alt='img'
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Link to={`/product-detail/${billDetail.ProductId}`}>
                                                                    {billDetail.ProductName}
                                                                </Link>
                                                            </td>
                                                            <td>x{billDetail.Quantity}</td>
                                                            <td>
                                                                {FormatPrice(billDetail.Price)} VND
                                                            </td>
                                                            <td>
                                                                {billDetail.Discount} %
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>Subtotal: {FormatPrice(item.Subtotal)} VND</td>
                                                <td>Shipping: {FormatPrice(item.Shipping)} VND</td>
                                                <td>Total: {FormatPrice(item.Total)} VND</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => {
                                                setDataPreview(item)
                                                toggle()
                                            }}
                                        >
                                            Bill Detail
                                        </button>
                                        &nbsp;
                                        {
                                            item.BillStatus.map(element => {
                                                //console.log(element)
                                                if (element.Code < 1 && element.Status === false) {
                                                    return <button className='btn btn-warning'
                                                        onClick={() => handleCancelOrder(item.Id)}
                                                    >Cancel order</button>
                                                }
                                                return null
                                            })
                                        }
                                        {/* <button className='btn btn-warning'>Cancel order</button> */}
                                    </div>
                                </Col>
                            </Row>
                        )
                    })
            }
            {
                dataPreview !== null &&
                <ModalBillDetail
                    toggle={toggle}
                    modal={modal}
                    data={dataPreview}
                />
            }

        </>
    )
}

export default OrderItem
