import React, { useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'

function Login() {

    useEffect(() => {
        document.title ='Login | X-BONSAI'
    }, [])

    return (
        <div className='pt-5 pb-5 mb-5 mt-5'>
            <Container>
                <Row>
                    <Col md={6}>
                        <h2>Login</h2>
                        <LoginForm />
                    </Col>
                    <Col md={6}>
                        <h2>Register</h2>
                        <RegisterForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
