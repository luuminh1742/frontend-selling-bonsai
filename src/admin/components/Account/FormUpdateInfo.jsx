import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Col, Row } from 'reactstrap'
import accountApi from '../../../api/accountApi'


function FormUpdateInfo() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const toastSuccess = (message)=>{
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
    const toastError = (message)=>{
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    const updateProfile = async (data) => {
        try {
            let params = {
                id: user.Id,
                type: 'PROFILE'
            }
            data.Password = "00000000"
            data.Id = user.Id
            data.RoleCode = user.RoleCode

            let resp = await accountApi.update(data, params)
            dispatch({
                type: 'ACCOUNT_UPDATE',
                ...data
            })

            toastSuccess('Update success');
        } catch (e) {
            toastError('Error')
        }
    }

    const onSubmit = (data) => updateProfile(data)


    return (
        <div className='bg-white p-4 mt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Update personal info</h5>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>Full Name</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            {...register('FullName', { required: true, value: user.FullName !== null ? user.FullName : '' })}
                        />
                        {errors.FullName && <p className='text-danger'>Full name is required.</p>}
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>Email</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            type='email'
                            {...register('Email', { required: true, value: user.Email !== null ? user.Email : '' })}
                        />
                        {errors.Email && <p className='text-danger'>Email is required.</p>}
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>Phone</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            {...register('Phone', { value: user.Phone !== null ? user.Phone : '' })}
                        />
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>Address</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            {...register('Address', { value: user.Address !== null ? user.Address : '' })}
                        />
                    </Col>
                </Row>
                <input type='submit' className='btn btn-dark' />
            </form>
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
            {/* Same as */}
            <ToastContainer />
        </div>

    )
}

export default FormUpdateInfo
