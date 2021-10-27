import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { FormGroup, Label, Row } from 'reactstrap'
import accountApi from '../api/accountApi';



function LoginForm() {
    const dispatch = useDispatch();

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
                alert('Đăng nhập thất bại')
            } else {
                alert('Đăng nhập thành công')
            }
        } catch (error) {
            console.log(error);
            alert('Lỗi đăng nhập')
        }
    }


    return (
        <form className='card p-2' onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className='pt-1 pb-1'>
                <Label>Email *</Label>
                <input
                    type='email'
                    placeholder='luuminh@gmail.com'
                    className='form-control'
                    {...register('Email', { required: true })}
                />
                {errors.Email && <p>Email is required.</p>}
            </FormGroup>
            <FormGroup className='pt-1 pb-1'>
                <Label>Password *</Label>
                <input
                    type='password'
                    className='form-control'
                    {...register('Password', { required: true })}
                />
                {errors.Password && <p>Password is required.</p>}
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
    )
}

export default LoginForm
