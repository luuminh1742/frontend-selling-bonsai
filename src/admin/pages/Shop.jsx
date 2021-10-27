import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import SidebarCategoryProduct from '../components/Shop/SidebarCategoryProduct'
import ListProduct from '../components/Shop/ListProduct'
import productCategoryApi from '../../api/productCategoryApi'

const dataProductCategories = [
    {
        Id: 1,
        Name: 'Cây cảnh trong nhà'
    },
    {
        Id: 2,
        Name: 'Cây cảnh dưới nước'
    },
    {
        Id: 3,
        Name: 'Cây cảnh ngoài sân'
    },
]


function Shop() {



    // const [productCategories, setProductCategories] = useState(dataProductCategories)

    const [categoryActive, setCategoryActive] = useState(0)

    const handlePressCategory = (id) => {
        setCategoryActive(id)
    }



    return (
        <div style={{ padding: 10 }}>
            <Row>
                <Col lg={3} className='p-1'>
                    <SidebarCategoryProduct
                        // productCategories={productCategories}
                        handlePressCategory={handlePressCategory}
                        categoryActive={categoryActive}
                    />

                </Col>
                <Col lg={9} className='p-1'>
                    <ListProduct
                        categoryId={categoryActive}
                    />

                </Col>
            </Row>
        </div>
    )
}

export default Shop
