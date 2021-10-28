import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Col, Row } from 'reactstrap'
import accountApi from '../../../api/accountApi'

function FormUpdatePassword() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
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
    const toastError = (message) => {
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
    const updatePassword = async (data) => {
        let dataSubmit = {
            AccountId: user.Id,
            OldPassword: data.OldPassword,
            NewPassword: data.NewPassword
        }
        try {
            let resp = await accountApi.updatePassword(dataSubmit)

            if (resp) {
                toastSuccess('Password update successful')
            } else {
                toastError('Old password is incorrect')
            }
        } catch (e) {
            toastError('Error')
        }
    }
    const onSubmit = (data) => updatePassword(data)

    return (
        <div className='bg-white p-4 mt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>Update password</h5>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>Old password</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            type='password'
                            {...register('OldPassword', { required: true })}
                        />
                        {errors.OldPassword && <p className='text-danger'>Old password is required.</p>}
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>New password</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            type='password'
                            {...register('NewPassword', { required: true })}
                        />
                        {errors.NewPassword && <p className='text-danger'>New password is required.</p>}
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col md={3}>
                        <label>Re-new password</label>
                    </Col>
                    <Col md={9}>
                        <input
                            className='form-control'
                            type='password'
                            {...register('ReNewPassword', { required: true })}
                        />
                        {errors.ReNewPassword && <p className='text-danger'>Re-new password is required.</p>}
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

export default FormUpdatePassword
