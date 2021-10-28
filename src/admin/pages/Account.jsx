import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import FormUpdateInfo from '../components/Account/FormUpdateInfo'
import FormUpdatePassword from '../components/Account/FormUpdatePassword'
const menuName = [
    {
        name: 'All',
        active: true
    },
    {
        name: 'Wait for confirmation',
        active: false
    },
    {
        name: 'Order confirmed',
        active: false
    },
    {
        name: 'Delivering',
        active: false
    },
    {
        name: 'Delivered',
        active: false
    },
    {
        name: 'Cancelled',
        active: false
    }
]
function Account() {
    const [activeTab, setActiveTab] = useState('1');
    return (
        <div className='bg-light mt-2'>
            <Nav tabs>
                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                        Update personal info
                    </NavLink>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                    <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        Update password
                    </NavLink>
                </NavItem>

            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <FormUpdateInfo />
                </TabPane>
                <TabPane tabId="2">
                    <FormUpdatePassword />
                </TabPane>
            </TabContent>
            {/* <FormUpdateInfo/>
            <FormUpdatePassword/> */}
        </div>
    )
}

export default Account
