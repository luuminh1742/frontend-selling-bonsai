import React from 'react'
import { Col, Row } from 'reactstrap'
import FormatPrice from '../../Utils/FormatPrice'

function OrderItem({ listBill }) {
    return (
        <>
            {
                listBill.map(item => {
                    return (
                        <Row className='rounded border p-3 mb-2' key={item.Id}>
                            <Col md={12}>
                                <div className='d-flex justify-content-between'>
                                    <span>10/10/2021</span>
                                    <span>Đang giao</span>
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
                                            <td>Subtotal: {FormatPrice(item.Subtotal)} VND</td>
                                            <td>Shipping: {FormatPrice(item.Shipping)} VND</td>
                                            <td>Total: {FormatPrice(item.Total)} VND</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end mt-3'>
                                    <button className='btn btn-secondary'>Cancel order</button>
                                </div>
                            </Col>
                        </Row>
                    )
                })
            }
        </>
    )
}

export default OrderItem
