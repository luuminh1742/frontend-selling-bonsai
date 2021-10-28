import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import productApi from '../../../api/productApi'
import ModalFormEditProduct from '../form/ModalFormEditProduct'
import loading from '../../assets/img/loading-23.gif'
import Pagination from "../../../components/Pagination/Pagination"



function ListProduct({ categoryId }) {

    //const [categoryIdChange,setCategoryChange] = useState(0)
    const [modal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [actionModal, setActionModal] = useState({ type: 'ADD' })
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [dataProducts, setDataProducts] = useState([])
    const [search, setSearch] = useState('')

    const fetchProducts = async () => {
        try {

            const params = {
                categoryId: categoryId,
                pageSize: 10,
                page: page,
                search: search
            }
            let resp = await productApi.getAll(params)
            //console.log(resp);
            setDataProducts(resp.data)
            setTotalPage(resp.totalPage)
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    const addProduct = async (data, params) => {

        try {
            let resp = await productApi.create(data, params)
            setDataProducts([resp, ...dataProducts])
            alert('Thêm sản phẩm thành công')
            toggle()
        } catch (error) {
            alert('Lỗi lưu dữ liệu')
        }
    }

    const updateProduct = async (data, params) => {

        try {
            let resp = await productApi.edit(data, params)
            fetchProducts()
            alert('Cập nhật sản phẩm thành công')
            toggle()
        } catch (error) {
            alert('Lỗi lưu dữ liệu')
        }
    }
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm('Xác nhận xóa sản phẩm này')
        if (!confirmDelete) return

        try {
            let params = {
                id: id
            }
            let resp = await productApi.delete(params)
            fetchProducts()
            alert('xóa sản phẩm thành công')

        } catch (error) {
            alert('Lỗi xóa dữ liệu')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [categoryId, page, search])


    const handleActionModal = (action) => {
        setActionModal(action)
        toggle()
    }
    const toggle = () => setModal(!modal);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber)
    }

    const handleSearchChange = e => {
        setSearch(e.target.value)
    }



    return (
        <div className='bg-white'>
            <h4
                className='bg-dark text-white p-2 text-center'
            >
                List product
            </h4>



            <div className='p-3'>

                <div className='mt-2 mb-4 d-flex justify-content-between'>
                    <button
                        className='btn-success btn'
                        onClick={() => handleActionModal({ type: 'ADD' })}
                    >
                        Add new product
                    </button>
                    <input placeholder='Search name product'
                        className='form-control'
                        style={{ width: 200 }}
                        onChange={handleSearchChange}
                    />
                </div>


                <table className='table table-bordered table-hover'>
                    <thead className='text-white bg-dark'>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {

                            isLoading ?
                                <tr>
                                    <td colspan="7">
                                        <img src={loading} alt='loading'
                                            style={{ width: '100%' }}
                                        />
                                    </td>

                                </tr>
                                :
                                dataProducts.map(item => {
                                    return (
                                        <tr key={item.Id}>
                                            <td>
                                                <img src={`/wwwroot/images/${item.Image}`}
                                                    alt='img' style={{ width: 100, height: 100 }} />
                                            </td>
                                            <td>{item.Name}</td>
                                            <td>{item.Price} ( VND )</td>
                                            <td>{item.Discount} ( % )</td>
                                            <td>{item.Quantity}</td>
                                            <td>
                                                {
                                                    item.Status ?
                                                        <span className='text-success'>Hiển thị</span>
                                                        : <span className='text-danger'>Ẩn</span>
                                                }
                                            </td>
                                            <td>
                                                <button className='btn btn-warning'
                                                    onClick={() => handleActionModal({ type: 'EDIT', data: item })}
                                                >Edit</button>
                                                {' '}
                                                <button className='btn btn-danger' onClick={() => deleteProduct(item.Id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                        }

                    </tbody>
                </table>
                {
                    dataProducts.length > 0 && <Pagination
                        totalPage={totalPage}
                        currentPage={page}
                        handlePageChange={handlePageChange}
                    />
                }

            </div>
            <ModalFormEditProduct
                modal={modal}
                toggle={toggle}
                addProduct={addProduct}
                actionModal={actionModal}
                updateProduct={updateProduct}
            />
        </div>
    )
}

export default ListProduct
