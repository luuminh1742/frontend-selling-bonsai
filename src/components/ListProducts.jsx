import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import ProductItem from './ProductItem'
import productApi from '../api/productApi'
import gifLoading from '../assets/img/loading.gif'
import imgNoProduct from '../assets/img/product_not_found.png'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import './style/Paging.css'
import { ToastContainer,toast } from 'react-toastify'

function ListProducts({ categoryProductActive }) {

    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [sortByPrice, setSortByPrice] = useState(0)
    const [search, setSearch] = useState('')

    const getDataProduct = async () => {
        try {
            setLoading(true)
            const params = {
                categoryId: categoryProductActive,
                page: page,
                pageSize: 9,
                sortByPrice: sortByPrice,
                search: search
            }
            let resp = await productApi.getAll(params)
            setProduct(resp.data)
            setTotalPage(resp.totalPage)
            setPage(resp.currentPage)
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    const handleChangeFilter = e => {
        setSortByPrice(e.target.value)
    }

    const handleChangeSearch = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        getDataProduct()
    }, [categoryProductActive, page, search, sortByPrice])

    return (
        <>
            <Row>
                <Col md={12} className='border d-flex justify-content-between p-2 mb-3'>
                    <div>
                        <select className='form-control'
                            onChange={handleChangeFilter}
                        >
                            <option value='0'>----- Sort products -----</option>
                            <option value='1'>Sort by price (top)</option>
                            <option value='-1'>Sort by price (down)</option>
                        </select>
                    </div>

                    <div>
                        <input placeholder='Search product name' className='form-control'
                            onChange={handleChangeSearch}
                        />
                    </div>
                </Col>

                {
                    loading ?
                        <Col className='text-center'>
                            <img src={gifLoading} alt='loading' />
                        </Col>
                        : products.length === 0 ?
                            <Col className='text-center p-4'>
                                <img src={imgNoProduct} alt='no product' />
                            </Col>
                            :
                            products.map(item => {
                                return (
                                    <Col lg={4} key={item.Id}>
                                        <ProductItem
                                            id={item.Id}
                                            name={item.Name}
                                            price={item.Price}
                                            image={item.Image}
                                            discount={item.Discount}
                                        />
                                    </Col>
                                )
                            })

                }



                {
                    totalPage > 1 &&
                    <Col lg={12} className='p-3 justify-content-center d-flex'>

                        {
                            page > 1 ?
                                <button
                                    className='btn-paging btn-paging-hover'
                                    onClick={() => setPage(page - 1)}
                                >
                                    <AiOutlineLeft style={{ marginTop: -3 }} /> Previous
                                </button>
                                : <button
                                    className='btn-paging' >
                                    <AiOutlineLeft style={{ marginTop: -3 }} /> Previous
                                </button>
                        }

                        &nbsp;
                        <span className='text-paging'>
                            {page} / {totalPage}
                        </span>
                        &nbsp;
                        {
                            page < totalPage ?
                                <button
                                    className='btn-paging btn-paging-hover'
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next <AiOutlineRight style={{ marginTop: -3 }} />
                                </button>
                                : <button
                                    className='btn-paging' >
                                    Next <AiOutlineRight style={{ marginTop: -3 }} />
                                </button>
                        }

                    </Col>
                }

            </Row>
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



export default ListProducts
