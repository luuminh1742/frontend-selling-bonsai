import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import Map from '../Map'

const key = "AIzaSyDWUDsQlpV5v59faeYOapTlLADz51_pbJ4"

function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm()
    const toastSuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const onSubmit = (data) => {
        toastSuccess('Email sent successfully')
        reset({
            Name:'',
            Email:'',
            Subject:'',
            Message:''
        })
    }
    useEffect(() => {
        document.title ='Contact | X-BONSAI'
    }, [])
    return (
        <div>
            <Container className='mt-5 mb-5 pt-5 pb-4'>
                <h3 className='text-center mb-5'>Connect with us</h3>

                <Row>
                    <Col lg={6}>
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                            loadingElement={<div style={{ height: 400 }} />}
                            containerElement={<div style={{ height: 400, margin: `auto`, border: '1px solid #ddd' }} />}
                            mapElement={<div style={{ height: 400 }} />}
                        />
                    </Col>
                    <Col lg={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <input className='form-control m-3' placeholder='Name' 
                                        {...register('Name',{required:true})}
                                    />
                                    {errors.Name && <p className='text-danger'>Name is required.</p>}
                                </Col>
                                <Col md={6}>
                                    <input className='form-control m-3' placeholder='Email' 
                                        {...register('Email',{required:true})}
                                    />
                                    {errors.Email && <p className='text-danger'>Email is required.</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <input className='form-control m-3' placeholder='Subject' 
                                        {...register('Subject',{required:true})}
                                    />
                                    {errors.Subject && <p className='text-danger'>Subject is required.</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <textarea className='form-control m-3' placeholder='Message' rows='5'
                                    {...register('Message',{required:true})}>
                                    </textarea>
                                    {errors.Message && <p className='text-danger'>Message is required.</p>}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <input className='form-control btn-dark m-3' type='submit' value='Send' />
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>


            </Container>
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
            <ToastContainer />
        </div>
    )
}

export default Contact
