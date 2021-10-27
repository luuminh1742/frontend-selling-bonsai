import React, { useEffect, useState } from 'react'
import './style/SidebarShop.css'
import productCategoryApi from '../api/productCategoryApi'
import loading from '../assets/img/loading.gif'

function SidebarShop({ categoryProductActive, handleCategoryProductActive }) {

    const [productCategories, setProductCategories] = useState([])

    const [loadingCategories, setLoadingCategories] = useState(true)

    const getDataProductCategories = async () => {
        try {
            let resp = await productCategoryApi.getAll()
            setProductCategories(resp)
        } catch (e) {

        } finally {
            setLoadingCategories(false)
        }
    }

    useEffect(() => {
        getDataProductCategories()
    }, [])


    return (
        <div>
            <div className='sidebar-shop-categories'>
                <h3 className='sidebar-shop-title'>Categories</h3>
                <ul>
                    {
                        loadingCategories ?
                            <li>
                                <img src={loading} alt="loading"
                                    style={{ width: '-webkit-fill-available' }}
                                />
                            </li>
                            :
                            productCategories.map(item => {
                                return (
                                    <li key={item.Id}
                                        className={categoryProductActive === item.Id && 'menu-sidebar-shop-active'}
                                        onClick={() => handleCategoryProductActive(item.Id)}
                                    >
                                        <span>{item.Name}</span>
                                        <span>({item.Products.length})</span>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SidebarShop
