import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import SidebarShop from '../SidebarShop'
import ListProducts from '../ListProducts'


function Shop() {

    const [categoryProductActive, setCategoryProductActive] = useState(0)

    const handleCategoryProductActive = id => {
        setCategoryProductActive(id)
    }

    useEffect(() => {
        document.title ='Shop | X-BONSAI'
    }, [])

    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <Col lg={3}>
                    <SidebarShop 
                        categoryProductActive={categoryProductActive}
                        handleCategoryProductActive={handleCategoryProductActive}
                    />
                </Col>
                <Col lg={9}>
                    <ListProducts 
                        categoryProductActive={categoryProductActive}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Shop
