import React, { useEffect } from 'react'
import { Button, FormGroup } from 'reactstrap'
import '../assets/style/Login.css'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import rolesApi from '../../api/rolesApi'
import accountApi from '../../api/accountApi'

function Login() {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();





    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();



    const fetchLogin = async (data) => {
        try {
            let resp = await accountApi.login(data)
            const user = {
                Id: resp.Id,
                Email: resp.Email,
                FullName: resp.FullName,
                RoleCode: resp.RoleCode
            }

            dispatch({
                type: 'LOGIN',
                ...user
            })

            window.localStorage.setItem('user', JSON.stringify(user))
            
            if(resp.data === null){
                alert('Đăng nhập thất bại')
            }else{
               alert('Đăng nhập thành công') 
            }
        } catch (error) {
            console.log(error);
            alert('Lỗi đăng nhập')
        }
    }


    const onSubmit = (data) => {
        fetchLogin(data);
    }




    return (
        <div className='__login_admin' onSubmit={handleSubmit(onSubmit)}>
            <form className='__login_form text-center'>
                <h2 className='text-center'>LOGIN</h2>
                <FormGroup>
                    <input
                        className='form-control mt-4'
                        placeholder='Email'
                        type='email'
                        {...register('Email', { required: true })}
                    />
                    {errors.Email && <p className='text-danger'>Email is required.</p>}
                </FormGroup>
                <FormGroup>
                    <input
                        className='form-control mt-4'
                        placeholder='Password'
                        type='password'
                        {...register('Password', { required: true })}
                    />
                    {errors.Password && <p className='text-danger'>Password is required.</p>}
                </FormGroup>
                <FormGroup >
                    <Button className=' mt-4' color='primary' type='submit'>Submit</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default Login
