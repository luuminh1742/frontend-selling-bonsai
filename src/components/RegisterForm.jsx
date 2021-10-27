import React from 'react'
import { useForm } from 'react-hook-form';
import { FormGroup, Label, Row } from 'reactstrap'
import accountApi from '../api/accountApi';

function RegisterForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },reset
    } = useForm()
    const onSubmit = (data) => {
        if(data.Password !== data.RePassword){
            alert('Mật khẩu không trùng khớp')
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

    const singup = async (data) =>{
        try{
            let resp = await accountApi.register(data)
            if(resp !== null){
                alert('Đăng ký thành công')
                clearData()
            }else{
                alert('Đăng ký thất bại')
            }
        }catch(e){
            alert('Lỗi xử lý dữ liệu')
        }
    }


    return (
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
        </form>
    )
}

export default RegisterForm
