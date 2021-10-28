import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap'
import './style/Header.css'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout, AiOutlineProfile } from 'react-icons/ai'

function Header() {

    const [activeHeader, setActiveHeader] = useState(1)

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    // console.log(user);
    const toggle = () => setIsOpen(!isOpen)

    const clickLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        dispatch({
            type: 'CART_DELETE_ALL'
        })

    }

    return (
        <Container>
            <Navbar light expand="md" className='justify-content-between'>
                <NavbarBrand >
                    <span style={{
                        fontWeight: 900,
                        fontSize: 24
                    }}>
                    <img src='image/logo_x_bonsai.png' alt='logo' width='50'/>
                        X-BONSAI
                    </span>

                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='flex-row-reverse '>
                    <Nav className="mr-auto" navbar>
                        <NavItem className={`text-center item-menu-header ${activeHeader === 1 && 'item-menu-header-active'}`}
                            onClick={() => setActiveHeader(1)}
                        >
                            <NavLink tag={Link} to='/' className='text-dark'>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem className={`text-center item-menu-header ${activeHeader === 2 && 'item-menu-header-active'}`}
                            onClick={() => setActiveHeader(2)}
                        >
                            <NavLink tag={Link} to='/shop' className='text-dark'>Shop</NavLink>
                        </NavItem>
                        <NavItem className={`text-center item-menu-header ${activeHeader === 3 && 'item-menu-header-active'}`}
                            onClick={() => setActiveHeader(3)}
                        >
                            <NavLink tag={Link} to='/blog' className='text-dark'>Blog</NavLink>
                        </NavItem>
                        <NavItem className={`text-center item-menu-header ${activeHeader === 4 && 'item-menu-header-active'}`}
                            onClick={() => setActiveHeader(4)}
                        >
                            <NavLink tag={Link} to='/contact-us' className='text-dark'>Contact Us</NavLink>
                        </NavItem>
                        <div className='d-flex' style={{ borderLeft: '1px solid #ddd' }}>

                            {
                                user.Id === null ?
                                    <NavItem className={`text-center item-menu-header ${activeHeader === 5 && 'item-menu-header-active'}`}
                                        onClick={() => setActiveHeader(5)}
                                    >
                                        <NavLink tag={Link} to='/login' className='text-dark'>Login</NavLink>
                                    </NavItem>
                                    :
                                    <>
                                        <NavItem className={`text-center item-menu-header ${activeHeader === 6 && 'item-menu-header-active'}`}
                                            onClick={() => setActiveHeader(6)}
                                        >
                                            <NavLink tag={Link} to='/cart' className='text-dark'>
                                                <span className='total-item-card'>{cart.products.length}</span>
                                                <AiOutlineShoppingCart />
                                            </NavLink>
                                        </NavItem>
                                        <UncontrolledDropdown nav inNavbar className={`text-center item-menu-header`}>
                                            <DropdownToggle nav caret >
                                                <AiOutlineUser />
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    <NavLink className='text-dark'>
                                                        {user.FullName}
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => setActiveHeader(7)}
                                                >
                                                    <NavLink tag={Link} to='/profile' className='text-dark'>
                                                        <AiOutlineProfile /> Profile
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavLink className='text-dark'
                                                        onClick={clickLogout}
                                                    >
                                                        <AiOutlineLogout /> Log out
                                                    </NavLink>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </>

                            }


                        </div>

                    </Nav>
                </Collapse>
            </Navbar>
        </Container>
    )
}

export default Header
