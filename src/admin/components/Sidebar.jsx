import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/Sidebar.css'
import { AiFillAppstore,
    AiFillShop,
    AiTwotoneContainer,
    AiOutlineRead,AiOutlineUser } from "react-icons/ai"

function Sidebar() {

    const [sidebarActive, setSidebarActive] = useState(1)


    return (
        <div className='__sidebar_wrapper'>
            <div className='__sidebar_heading'>
                X-BONSAI
            </div>
            <div className='__sidebar_content'>
                <ul>
                    <li
                        className={sidebarActive === 1 && '__sidebar_content_active'}
                        onClick={() => setSidebarActive(1)}
                    >
                        <Link to='/admin'>
                            <AiFillAppstore style={{...styleIcon}}/> &nbsp; Dashboard
                        </Link>
                    </li>
                    <li
                        className={sidebarActive === 2 && '__sidebar_content_active'}
                        onClick={() => setSidebarActive(2)}
                    >
                        <Link to='/admin/shop'>
                            <AiFillShop style={{...styleIcon}}/> &nbsp; Shop
                        </Link>
                    </li>
                    <li
                        className={sidebarActive === 3 && '__sidebar_content_active'}
                        onClick={() => setSidebarActive(3)}
                    >
                        <Link to='/admin/bill'>
                            <AiTwotoneContainer style={{...styleIcon}}/> &nbsp; Bill
                        </Link>
                    </li>
                    <li
                        className={sidebarActive === 4 && '__sidebar_content_active'}
                        onClick={() => setSidebarActive(4)}
                    >
                        <Link to='/admin/blog'>
                            <AiOutlineRead style={{...styleIcon}}/> &nbsp; Blog
                        </Link>
                    </li>
                    <li
                        className={sidebarActive === 5 && '__sidebar_content_active'}
                        onClick={() => setSidebarActive(5)}
                    >
                        <Link to='/admin/account'>
                            <AiOutlineUser style={{...styleIcon}}/> &nbsp; Account
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}


const styleIcon = {
    marginTop: -4,
    fontSize: 25
}

export default Sidebar
