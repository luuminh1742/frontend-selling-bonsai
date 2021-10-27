import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import OrderItem from './OrderItem'
import { menuName } from './MenuName';
import { createDispatchHook, useSelector } from 'react-redux';
import billApi from '../../api/billApi'


function Orders() {

    const user = useSelector(state => state.user)

    const [listBill,setListBill] = useState([])



    const [dataMenu, setDataMenu] = useState(menuName);

    const handleClickMenu = (id) => {

        let newData = dataMenu.map((item, index) => {
            if (index === id) {
                item.active = true
            } else {
                item.active = false
            }
            return item
        })

        setDataMenu(newData);
    }

    const getBill = async () => {
        try {
            let params = {
                accountId: user.Id
            }
            let resp = await billApi.getAll(params)
            console.log(resp);
            setListBill(resp)
        } catch (e) {

        }
    }

    useEffect(() => {
        getBill()
    }, [])

    return (
        <Row>
            <div className='border rounded text-center orders-menu'>
                {
                    dataMenu.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={item.active && 'order_menu_active'}
                                onClick={() => handleClickMenu(index)}
                            >
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>

            <div className='mt-2'>
                <OrderItem 
                    listBill={listBill}
                />
            </div>
        </Row>
    )
}

export default Orders
