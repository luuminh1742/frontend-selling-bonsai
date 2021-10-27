import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col } from 'reactstrap'
import { useForm } from 'react-hook-form'
import GetBase64Image from '../../../Utils/GetBase64Image'
import productCategoryApi from '../../../api/productCategoryApi'
import productApi from '../../../api/productApi'
import loading from '../../assets/img/loading-23.gif'
import { CKEditor } from 'ckeditor4-react'



const ModalFormEditProduct = ({ modal, toggle, addProduct, actionModal, updateProduct }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, setValue, getValues
    } = useForm();

    const [productCategories, setProductCategories] = useState([])
    const [imageProduct, setImageProduct] = useState(null)


    const handleChangeProductDetail = (e) => {
        let newContent = e.editor.getData()
        //setProductDetail(newContent)
        setValue('ProductDetail', newContent)
    }

    const onSubmit = (data) => {

        let FileName = ''
        if (imageProduct !== null) {
            data.Image = imageProduct.Image
            FileName = imageProduct.FileName
        }
        //console.log(data);

        if (actionModal.type === 'ADD') {
            addProduct(data, { FileName: FileName })
        } else {
            data.Id = actionModal.data.Id
            let params = {
                id: actionModal.data.Id
            }
            if (FileName !== undefined) {
                params.FileName = FileName
            } else {
                data.Image = actionModal.data.Image

            }

            updateProduct(data, params)
        }


        reset({
            Name: '',
            Price: '',
            Discount: '',
            Quantity: '',
            ShortDescription: '',
            ProductDetail: ''
        })
        // console.log(data);

    }
    const pressChooseImage = e => {
        GetBase64Image(e)
            .then(result => {
                let data = {
                    FileName: result.FileName,
                    Image: result.Base64
                }
                setImageProduct(data);
                //console.log(data);
            })
            .catch(error => console.log(error))
    }


    const fetchDataProductCategory = async () => {
        try {
            let resp = await productCategoryApi.getAll()
            setProductCategories(resp)
        } catch (error) {

        }
    }


    const closeModal = () => {
        reset({
            Name: '',
            Price: '',
            Discount: '',
            Quantity: '',
            ShortDescription: '',
            ProductDetail: ''
        })
        setImageProduct(null)
        toggle()
    }



    useEffect(() => {
        fetchDataProductCategory()

        if (actionModal.type === 'EDIT') {
            setImageProduct({ Image: `/wwwroot/images/${actionModal.data.Image}` })
        }
    }, [])





    return (
        <>
            <Modal centered={true} size='lg' isOpen={modal} toggle={toggle}>
                <ModalHeader >
                    {
                        actionModal.type === 'ADD' ? 'Create new product' : 'Update product'
                    }
                </ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Product Category (*)</Label>
                            <Col md={9}>
                                <select className='form-control'
                                    {...register('CategoryId', { required: true },
                                        { value: actionModal.type === 'EDIT' ? actionModal.data.CategoryId : '' })}
                                    {...reset}
                                >
                                    {

                                        productCategories.map(item => {

                                            return (
                                                <option
                                                    key={item.Id}
                                                    value={item.Id}

                                                >
                                                    {item.Name}
                                                </option>
                                            )
                                        })

                                    }
                                </select>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Hiển thị (*)</Label>
                            <Col md={9}>
                                <input
                                    {...register('Status',
                                        { value: actionModal.type === 'EDIT' ? actionModal.data.Status:getValues('Status') })}
                                    type='checkbox'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Product Name (*)</Label>
                            <Col md={9}>
                                <input
                                    {...register('Name',
                                        { required: true, value: actionModal.type === 'EDIT' ? actionModal.data.Name : getValues('Name') })}
                                    className='form-control'
                                    type='text'
                                />
                                {errors.Name && <p className='text-danger'>Name is required.</p>}
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Price(VND) (*)</Label>
                            <Col md={9}>
                                <input
                                    {...register('Price', { required: true, value: actionModal.type === 'EDIT' ? actionModal.data.Price : getValues('Price') })}
                                    className='form-control'
                                    type='number'
                                />
                                {errors.Price && <p className='text-danger'>Price is required.</p>}
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Discount(%) (*)</Label>
                            <Col md={9}>
                                <input
                                    {...register('Discount',
                                        { required: true, value: actionModal.type === 'EDIT' ? actionModal.data.Discount : getValues('Discount') })}
                                    className='form-control'
                                    type='number'
                                />
                                {errors.Discount && <p className='text-danger'>Discount is required.</p>}
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Quantity (*)</Label>
                            <Col md={9}>
                                <input
                                    {...register('Quantity',
                                        { required: true, value: actionModal.type === 'EDIT' ? actionModal.data.Quantity : getValues('Quantity') })}
                                    className='form-control'
                                    type='number'
                                />
                                {errors.Quantity && <p className='text-danger'>Quantity is required.</p>}
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Image (*)</Label>
                            <Col md={9}>
                                <input
                                    className='form-control'
                                    type='file'
                                    accept='image/*'
                                    onChange={pressChooseImage}
                                />
                                {
                                    imageProduct !== null &&
                                    <div className='pt-3 pb-3'>
                                        <img alt='img'
                                            src={imageProduct.Image}
                                            style={{ width: ' -webkit-fill-available' }}
                                        />
                                    </div>
                                }

                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Short description</Label>
                            <Col md={9}>
                                <textarea
                                    {...register('ShortDescription',
                                        { value: actionModal.type === 'EDIT' ? actionModal.data.ShortDescription : getValues('ShortDescription') })}
                                    className='form-control'
                                    rows={4}
                                ></textarea>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='mb-3'>
                            <Label md={3}>Product detail</Label>
                            <Col md={9}>
                                <CKEditor
                                    initData={actionModal.type === 'EDIT' && actionModal.data.ProductDetail}
                                    onChange={handleChangeProductDetail}
                                    className='form-control'
                                />
                                {/* <textarea
                                    {...register('ProductDetail',
                                        { value: actionModal.type === 'EDIT' ? actionModal.data.ProductDetail : '' })}
                                    className='form-control'
                                    rows={5}
                                ></textarea> */}
                            </Col>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit'>Save</Button>{' '}
                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}

export default ModalFormEditProduct