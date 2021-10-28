import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import billApi from '../../api/billApi'
import OrderItem from '../components/Bill/OrderItem'

function Bill() {
    const [activeTab, setActiveTab] = useState('0')

    const user = useSelector(state => state.user)

    const [listBill, setListBill] = useState([])
    const [loadOrder, setLoadOrder] = useState(true)
    const [codeStatus, setCodeStatus] = useState(0)


    const getBill = async () => {
        try {
            let params = {
                code: codeStatus
            }
            let resp = await billApi.getBillFilter(params)
            setListBill(resp)
        } catch (e) {
            console.log('error');
        } finally {
            setLoadOrder(false)
        }
    }

    const handleLoadBillItem = () => {
        getBill()
    }

    const handleClickTab = (code) => {
        setActiveTab(code.toString())
        setCodeStatus(code)
    }

    useEffect(() => {
        getBill()
    }, [ codeStatus])



    return (
        <div className='bg-light mt-2'>
            <Nav tabs>

                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '0' ? 'active' : ''} onClick={() => handleClickTab(0)}>
                        Wait for confirmation
                    </NavLink>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => handleClickTab(2)}>
                        Order confirmed
                    </NavLink>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => handleClickTab(3)}>
                        Delivering
                    </NavLink>
                </NavItem>

                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '4' ? 'active' : ''} onClick={() => handleClickTab(4)}>
                        Delivery successful
                    </NavLink>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => handleClickTab(1)}>
                        Cancelled
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={'0'}>
                <TabPane tabId="0">
                    <div className='mt-2 pb-2'>
                        <OrderItem
                            listBill={listBill}
                            loadOrder={loadOrder}
                            handleLoadBillItem={handleLoadBillItem}
                        />
                    </div>
                </TabPane>
                {/* <TabPane tabId="1">
                    <div className='mt-2 pb-2'>
                        <OrderItem
                            listBill={listBill}
                            loadOrder={loadOrder}
                            handleLoadBillItem={handleLoadBillItem}
                        />
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className='mt-2 pb-2'>
                        <OrderItem
                            listBill={listBill}
                            loadOrder={loadOrder}
                            handleLoadBillItem={handleLoadBillItem}
                        />
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div className='mt-2 pb-2'>
                        <OrderItem
                            listBill={listBill}
                            loadOrder={loadOrder}
                            handleLoadBillItem={handleLoadBillItem}
                        />
                    </div>
                </TabPane>
                <TabPane tabId="4">
                    <div className='mt-2 pb-2'>
                        <OrderItem
                            listBill={listBill}
                            loadOrder={loadOrder}
                            handleLoadBillItem={handleLoadBillItem}
                        />
                    </div>
                </TabPane> */}
            </TabContent>
        </div>
    )
}

export default Bill
