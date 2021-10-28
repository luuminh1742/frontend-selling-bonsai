import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import OrderItem from './OrderItem'
import { menuName } from './MenuName';
import { useSelector } from 'react-redux';
import billApi from '../../api/billApi'



function Orders() {

    const user = useSelector(state => state.user)

    const [listBill, setListBill] = useState([])
    const [loadOrder, setLoadOrder] = useState(true)
    const [changeTab, setChangeTab] = useState(0)

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
                accountId: user.Id,
                code:changeTab
            }
            let resp = await billApi.getBillFilter(params)
            // console.log(resp);
            setListBill(resp)
        } catch (e) {

        } finally {
            setLoadOrder(false)
        }
    }
    const handleLoadBillItem = () => {
        getBill()
    }
    useEffect(() => {
        getBill()
    }, [changeTab])

    return (
        <Row>
            <div className='border rounded text-center orders-menu'>
                {
                    dataMenu.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={item.active && 'order_menu_active'}
                                onClick={() => {
                                    handleClickMenu(index)
                                    setChangeTab(item.code)
                                }}
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
                    loadOrder={loadOrder}
                    handleLoadBillItem={handleLoadBillItem}
                />
            </div>
        </Row>
    )
}

export default Orders
