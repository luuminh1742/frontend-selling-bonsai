import React from 'react'
import { useForm } from 'react-hook-form';
import {
    Button,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap'


function ModalFormEditProductCategory({ toggle, modal, action, addProductCategory, editProductCategory }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();




    const onSubmit = (data) => {
        if (action.type === 'ADD') {
            addProductCategory(data)
            reset({ Name: '' })
        } else if (action.type === 'EDIT') {
            const id = action.id
            data.Id = id

            editProductCategory(data, id)
            reset({ Name: '' })
        }
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>{action.type === 'ADD' ? 'Create new category' : 'Edit category'}</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label>Category name
                                {
                                    action.type === 'EDIT' &&
                                        <span className='text-warning'> ( Old name: {action.name} ) </span>
                                }
                            </Label>
                            <input className='form-control'
                                {...register('Name', { required: true })}
                            />
                            {errors.Name && <p className='text-danger'>Category Name is required.</p>}
                        </FormGroup>


                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="primary">Save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    )
}

export default ModalFormEditProductCategory
