import React from 'react'
import { Col, Container, Row } from 'reactstrap'

function Contact() {
    return (
        <div>
            <Container className='mt-5 mb-5 pt-5 pb-4'>
                <h3 className='text-center'>Connect with us</h3>
                <form>
                    <Row>
                        <Col md={6}>
                            <input className='form-control m-3' placeholder='Name' />
                        </Col>
                        <Col md={6}>
                            <input className='form-control m-3' placeholder='Email' />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <input className='form-control m-3' placeholder='Subject' />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <textarea className='form-control m-3' placeholder='Message' rows='5'>

                            </textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <input className='form-control btn-dark m-3' type='submit' value='Send' />
                        </Col>
                    </Row>
                </form>

                {/* <Row>
                    sdf
                </Row> */}
            </Container>
        </div>
    )
}

export default Contact
