import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { Col, Label, Row } from 'reactstrap';
import accountApi from '../api/accountApi'

function ProfileItem() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm()

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        mode: "onBlur",
      });
    
      const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
      } = useForm({
        mode: "onBlur",
      });



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
    const onSubmitInfoProfile = (data) => {

        updateProfile(data)
    }

    const onSubmitPassword = (data) => {
        if (data.NewPassword !== data.ReNewPassword) {
            toastError('Re-enter new password does not match')
            return
        }
        //console.log(data);
        updatePassword(data)
    }



    return (
        <div>
            <h3>My profile</h3>
            <p>
                Manage profile information for account security
            </p>
            <hr />
            <form onSubmit={handleSubmit(onSubmitInfoProfile)}>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>Full Name</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register('FullName', {
                                required: true,
                                value: user.FullName
                            })}
                        />
                        {errors.FullName && <p className='text-danger'>Full name is required.</p>}
                    </Col>
                </Row>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>Email</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register('Email', { required: true, value: user.Email })}
                        />
                        {errors.Email && <p className='text-danger'>Email is required.</p>}
                    </Col>
                </Row>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>Phone</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register('Phone', { value: user.Phone })}
                        />
                    </Col>
                </Row>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>Address</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register('Address', { value: user.Address })} />
                    </Col>
                </Row>
                <button
                    type='submit'
                    className='btn-dark rounded mt-2 pt-1 pb-1'
                    style={{ width: 150 }}
                >
                    Save
                </button>
            </form>

            <br />
            <br />
            <br />

            <h3>Update password</h3>
            <hr />
            <form onSubmit={handleSubmit2(onSubmitPassword)}>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>Old password</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register2('OldPassword', { required: true })}
                            type='password' />
                        {errors2.OldPassword && <p className='text-danger'>Old password is required.</p>}
                    </Col>
                </Row>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>New password</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register2('NewPassword', { required: true })}
                            type='password'
                        />
                        {errors2.NewPassword && <p className='text-danger'>New password is required.</p>}
                    </Col>
                </Row>
                <Row className='p-2'>
                    <Col md={3}>
                        <Label>Re-New password</Label>
                    </Col>
                    <Col md={9}>
                        <input className='form-control'
                            {...register2('ReNewPassword', { required: true })}
                            type='password' />
                        {errors2.ReNewPassword && <p className='text-danger'>Re-new password is required.</p>}
                    </Col>
                </Row>

                <button
                    type='submit'
                    className='btn-dark rounded mt-2 pt-1 pb-1'
                    style={{ width: 150 }}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default ProfileItem
