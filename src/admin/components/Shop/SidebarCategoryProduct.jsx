import React, { useEffect, useState } from 'react'
import productCategoryApi from '../../../api/productCategoryApi'
import ModalFormEditProductCategory from '../form/ModalFormEditProductCategory'
import './SidebarCategoryProduct.css'
import loading from '../../assets/img/loading-23.gif'

const ActionCategory = ({ toggleModalEditProductCategory, handleAction, data, deleteProductCategory }) => {



    return (
        <span>
            <button
                className='p-2 border-0 rounded-circle text-warning bg-white'
                style={{ width: 40, height: 40 }}
                onClick={() => {
                    toggleModalEditProductCategory()
                    let dataAction = { type: 'EDIT', id: data.Id, name: data.Name }
                    handleAction(dataAction)


                }}
                title='Edit product category'
            >
                <i class="far fa-edit"></i>
            </button>
            {' '}
            <button
                className='p-2 border-0 rounded-circle text-danger bg-white'
                style={{ width: 40, height: 40 }}
                title='Delete product category'
                onClick={() => deleteProductCategory(data.Id)}
            >
                <i class="fas fa-trash-alt"></i>
            </button>
        </span>
    )
}




function SidebarCategoryProduct({ handlePressCategory, categoryActive }) {

    const [isLoading, setIsLoading] = useState(true)
    const [productCategories, setProductCategories] = useState([])

    const [isOpenModalEditProductCategory, setIsOpenModalEditProductCategory] = useState(false)

    const [action, setAction] = useState({ type: 'ADD', id: null, name: null });

    const toggleModalEditProductCategory = () => setIsOpenModalEditProductCategory(!isOpenModalEditProductCategory)

    const handleAction = (data) => {
        //console.log(data);
        let newAction = null
        if (data.type === 'ADD') {
            newAction = { type: 'ADD', id: null, name: null }
            setAction(newAction)
        } else {
            newAction = { type: 'EDIT', id: data.id, name: data.name }
            setAction(newAction)
        }

    }

    const fetchDataProductCategory = async () => {
        try {
            let resp = await productCategoryApi.getAll()
            setProductCategories(resp)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const addProductCategory = async (data) => {
        try {
            let resp = await productCategoryApi.create(data)
            setProductCategories([...productCategories, resp])
            toggleModalEditProductCategory()
        } catch (e) {
            alert('Lỗi thêm thể loại sản phẩm')
        }
    }
    const editProductCategory = async (data, id) => {
        try {
            let resp = await productCategoryApi.edit(data, { id: id })
            fetchDataProductCategory()
            toggleModalEditProductCategory()
        } catch (e) {
            alert('Lỗi cập nhật thể loại sản phẩm')
        }
    }
    const deleteProductCategory = async (id) => {

        let checkDelete = window.confirm("Confirm remove this product category!");

        if (!checkDelete) return

        try {
            let resp = await productCategoryApi.delete({ id: id })
            fetchDataProductCategory()
        } catch (e) {
            alert('Lỗi xóa thể loại sản phẩm')
        }
    }
    useEffect(() => {
        fetchDataProductCategory();
    }, [])



    return (
        <div className='bg-white'>
            <h4
                className='bg-dark text-white p-2 text-center'
            >
                Category
            </h4>
            <div className='__sidebar_menu_product_category'>
                <ul>
                    {
                        isLoading ?
                            <img src={loading} alt='loading'
                                style={{ width: '-webkit-fill-available' }}
                            /> :
                            productCategories.map(item => {
                                return (
                                    <li key={item.Id}>
                                        <div
                                            className={`__item_menu 
                                        ${categoryActive === item.Id
                                                && '__item_menu_active'}`}
                                            onClick={() => handlePressCategory(item.Id)}>
                                            <span>{item.Name}</span>
                                            <span>( {item.Products.length} )</span>
                                            {
                                                categoryActive === item.Id &&
                                                <ActionCategory
                                                    toggleModalEditProductCategory={toggleModalEditProductCategory}
                                                    handleAction={handleAction}
                                                    data={{ Id: item.Id, Name: item.Name }}
                                                    deleteProductCategory={deleteProductCategory}
                                                />
                                            }
                                        </div>
                                    </li>
                                )
                            })
                    }
                </ul>

                <div className='border-top mt-2 mb-2 __add_new_category'>

                    <button onClick={() => {
                        handleAction({ type: 'ADD' })
                        toggleModalEditProductCategory()
                    }}>
                        Add new category
                    </button>
                </div>
            </div>



            <ModalFormEditProductCategory
                toggle={toggleModalEditProductCategory}
                modal={isOpenModalEditProductCategory}
                action={action}
                addProductCategory={addProductCategory}
                editProductCategory={editProductCategory}
            />

        </div>
    )
}

export default SidebarCategoryProduct
