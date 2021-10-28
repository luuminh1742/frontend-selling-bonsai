import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row } from 'reactstrap'
import accountApi from '../api/accountApi';
import { ToastContainer, toast } from 'react-toastify'
import imgLoad from '../assets/img/loading.gif'

function LoginForm() {
    const dispatch = useDispatch();
    const [onLoading, setOnloading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm()
    const onSubmit = (data) => {
        fetchLogin(data)
    }

    const fetchLogin = async (data) => {
        try {
            setOnloading(true)
            let resp = await accountApi.login(data)
            const user = {
                Id: resp.Id,
                Email: resp.Email,
                FullName: resp.FullName,
                RoleCode: resp.RoleCode,
                Phone: resp.Phone,
                Address: resp.Address
            }

            dispatch({
                type: 'LOGIN',
                ...user
            })


            if (resp.data === null) {
                toastError('Login failed')
            } else {
                toastSuccess('Logged in successfully')
            }
        } catch (error) {
            toastError('Login failed')
        } finally {
            setOnloading(false)
        }
    }

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

    return (
        <>
            <form className='card p-2' onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className='pt-1 pb-1'>
                    <Label>Email *</Label>
                    <input
                        type='email'
                        placeholder='luuminh@gmail.com'
                        className='form-control'
                        {...register('Email', { required: true })}
                    />
                    {errors.Email && <p className='text-danger'>Email is required.</p>}
                </FormGroup>
                <FormGroup className='pt-1 pb-1'>
                    <Label>Password *</Label>
                    <input
                        type='password'
                        className='form-control'
                        {...register('Password', { required: true })}
                    />
                    {errors.Password && <p className='text-danger'>Password is required.</p>}
                </FormGroup>
                <FormGroup className='pt-1 pb-1'>
                    <a className='mt-1 mb-1' href='/'>Lost your password?</a>
                    <br />
                    <input type='submit' value='Login' className='mt-1 mb-1'
                        style={{
                            backgroundColor: '#79a206',
                            borderRadius: 50,
                            border: 'none',
                            padding: '10px 20px',
                            color: '#fff'
                        }}
                    />
                </FormGroup>

            </form>
            {
                onLoading &&
                <div>
                    <img src={imgLoad} alt='' style={{ width: 100 }} />
                </div>
            }

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
        </>
    )
}

export default LoginForm
