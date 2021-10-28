import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify'
import { FormGroup, Label, Row } from 'reactstrap'
import accountApi from '../api/accountApi'
import imgLoad from '../assets/img/loading.gif'

function RegisterForm() {
    const [onLoading, setOnloading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },reset
    } = useForm()
    const onSubmit = (data) => {
        if(data.Password !== data.RePassword){
            toastError('Re-enter new password does not match')
            return
        }
        delete data.RePassword
        data.RoleCode = 'CLIENT'
        singup(data)
    }


    const clearData = ()=>{
        reset({
            FullName:'',
            Email:'',
            Password:'',
            RePassword:''
        })
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
    const singup = async (data) =>{
        try{
            let resp = await accountApi.register(data)
            if(resp !== null){
                toastSuccess('Successful account registration')
                clearData()
            }else{
                toastError('Account registration failed ')
            }
        }catch(e){
            toastError('Data processing error')
        }
    }


    return (
        <>
        <form className='card p-2' onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className='pt-1 pb-1'>
                <Label>Full Name *</Label>
                <input
                    type='text'
                    placeholder='Lưu Bá Minh'
                    className='form-control'
                    {...register('FullName', { required: true })}
                />
                {errors.FullName && <p className='text-danger'>Full name is required.</p>}
            </FormGroup>
            <FormGroup className='pt-1 pb-1'>
                <Label>Email *</Label>
                <input
                    type='email'
                    placeholder='luuminh@gmail.com'
                    className='form-control'
                    {...register('Email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                />
                {errors.Email && <p className='text-danger'>Email invalidate.</p>}
            </FormGroup>
            <FormGroup className='pt-1 pb-1'>
                <Label>Password *</Label>
                <input
                    type='password'
                    className='form-control'
                    {...register('Password', { required: true, minLength: 8 })}
                />
                {errors.Password && <p className='text-danger'>Password is required and min length = 8.</p>}
            </FormGroup>
            <FormGroup className='pt-1 pb-1'>
                <Label>Re-Password *</Label>
                <input
                    type='password'
                    className='form-control'
                    {...register('RePassword', { required: true, minLength: 8 })}
                />
                {errors.RePassword && <p className='text-danger'>Re-Password is required and min length = 8.</p>}
            </FormGroup>
            <FormGroup className='pt-1 pb-1'>

                <input type='submit' value='Register' className='mt-1 mb-1'
                    style={{
                        backgroundColor: '#79a206',
                        borderRadius: 50,
                        border: 'none',
                        padding: '10px 20px',
                        color: '#fff'
                    }}
                />
            </FormGroup>
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
        </form>
        {
                onLoading &&
                <div>
                    <img src={imgLoad} alt='' style={{ width: 100 }} />
                </div>
            }
        </>
    )
}

export default RegisterForm
