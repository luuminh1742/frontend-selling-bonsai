import React, { useEffect } from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Container, Jumbotron, Row, UncontrolledCarousel } from 'reactstrap'
import CardService from '../Service/CardService'
import '../style/Home.css'
import cay1 from '../../assets/img/cay1.jpg'
import cay2 from '../../assets/img/cay2.jpg'
import cay3 from '../../assets/img/cay3.jpg'
import { Link } from 'react-router-dom'

const items = [
    {
        src: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider2.jpg',
        altText: '',
        caption: '',
        header: '',
        key: '1'
    },
    {
        src: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider3.jpg',
        altText: '',
        caption: '',
        header: '',
        key: '2'
    },
    {
        src: 'https://template.hasthemes.com/lukani/lukani/assets/img/slider/slider1.jpg',
        altText: '',
        caption: '',
        header: '',
        key: '3'
    }
]


function Home() {

    useEffect(()=>{
        document.title ='Home | X-BONSAI'
    },[])

    return (
        <div>
            <Jumbotron className='position-relative'>
                <UncontrolledCarousel items={items} />
                {/* <Slides/> */}
                <div className='text-banner'>
                    <h1 className='font-weight-bold'>BIG SALE</h1>
                    <p className='font-weight-bold'>Discount <span className='text-success'>20%</span> Off For X-BONSAI Member</p>
                    <Link to='/shop'>
                        START SHOPPING NOW
                    </Link>
                </div>
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
                            <h2>Service</h2>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <CardService
                        img={cay1}
                        title='Bonsai rental service'
                    />
                    <CardService
                        img={cay2}
                        title='Service of providing bonsai seeds'
                    />
                    <CardService
                        img={cay3}
                        title='Service of taking care of bonsai at home'
                    />
                </Row>

                <Row>
                    <Col sm={12}>
                        <div class="section_intro_title text-center">
                            <h2>What you get when you shop at X-BONSAI</h2>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <Card style={{ minHeight: 150 }}>
                            <CardBody className='text-center'>
                                <CardTitle tag='h5' >
                                    Largest Selection
                                </CardTitle>
                                <CardText>
                                    We are the largest
                                    dedicated nursery of bonsai
                                    trees in the United States.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card style={{ minHeight: 150 }}>
                            <CardBody className='text-center'>
                                <CardTitle tag='h5' >
                                    Best Quality
                                </CardTitle>
                                <CardText>
                                    Loving care means optimal
                                    health and longevity for
                                    your bonsai tree.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card style={{ minHeight: 150 }}>
                            <CardBody className='text-center'>
                                <CardTitle tag='h5' >
                                    Experienced Staff
                                </CardTitle>
                                <CardText>
                                    Because we grow them
                                    at our nursery, we are
                                    extremely knowledgeable.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card style={{ minHeight: 150 }}>
                            <CardBody className='text-center'>
                                <CardTitle tag='h5' >
                                    Smooth Shipping
                                </CardTitle>
                                <CardText>
                                    Customized shipping
                                    options ensure your bonsai
                                    arrive in perfect condition.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Home
