import React from 'react'
import { Col, Container, Jumbotron, Row, UncontrolledCarousel } from 'reactstrap'
import ProductItem from '../ProductItem'
import '../style/Home.css'


const items = [
    {
        src: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider3.jpg',
        altText: 'Slide 2',
        caption: 'Caption 1',
        header: 'Slide 1 Header',
        key: '1'
    },
    {
        src: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider2.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2',
        header: 'Slide 2 Header',
        key: '2'
    },
    {
        src: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider1.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3',
        header: 'Slide 3 Header',
        key: '3'
    }
]


function Home() {
    return (
        <div>
            <Jumbotron>
                <UncontrolledCarousel items={items} />
            </Jumbotron>

            <Container className='mt-4 mb-4'>
                <Row>
                    <Col sm={12}>
                        <div className='section_intro_title lstore_title'>
                            <h2>X-Bonsai Store</h2>
                            <p>Commodo sociosqu venenatis cras dolor sagittis integer luctus sem primis eget maecenas sedurna malesuada consectetuer.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={6}>
                        <div className='single_shipping'>
                            <div className='shipping_icon'>
                                <img src='https://template.hasthemes.com/lukani/lukani/assets/img/about/shipping1.png' alt='img' />
                            </div>
                            <div className='shipping_content'>
                                <h3>Free Delivery</h3>
                                <p>Free shipping around the world for all <br /> orders over $120
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={6}>
                        <div className='single_shipping '>
                            <div className='shipping_icon'>
                                <img src='https://template.hasthemes.com/lukani/lukani/assets/img/about/shipping2.png' alt='img' />
                            </div>
                            <div className='shipping_content'>
                                <h3>Safe Payment</h3>
                                <p>With our payment gateway, don’t worry <br /> about your information</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={6}>
                        <div className='single_shipping col_3'>
                            <div className='shipping_icon'>
                                <img src='https://template.hasthemes.com/lukani/lukani/assets/img/about/shipping3.png' alt='img' />
                            </div>
                            <div className='shipping_content'>
                                <h3>Friendly Services</h3>
                                <p>You have 30-day return guarantee for <br /> every single order</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <div class="section_intro_title text-center">
                            <h2>Featured Products</h2>
                        </div>

                    </Col>
                </Row>
                <Row>
                    {/* <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col>
                    <Col lg={3}>
                        <ProductItem />
                    </Col> */}
                </Row>
            </Container>

        </div>
    )
}

export default Home
