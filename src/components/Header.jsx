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
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    
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
                        X-BONSAI
                    </span>

                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='flex-row-reverse '>
                    <Nav className="mr-auto" navbar>
                        <NavItem className='text-center item-menu-header'>
                            <NavLink tag={Link} to='/' className='text-dark'>Home</NavLink>
                        </NavItem>
                        <NavItem className='text-center item-menu-header'>
                            <NavLink tag={Link} to='/shop' className='text-dark'>Shop</NavLink>
                        </NavItem>
                        <NavItem className='text-center item-menu-header'>
                            <NavLink tag={Link} to='/blog' className='text-dark'>Blog</NavLink>
                        </NavItem>
                        <NavItem className='text-center item-menu-header'>
                            <NavLink tag={Link} to='/contact-us' className='text-dark'>Contact Us</NavLink>
                        </NavItem>
                        <div className='d-flex' style={{ borderLeft: '1px solid #ddd' }}>

                            {
                                user.Id === null ?
                                    <NavItem className='text-center item-menu-header'>
                                        <NavLink tag={Link} to='/login' className='text-dark'>Login</NavLink>
                                    </NavItem>
                                    :
                                    <>
                                        <NavItem className='text-center item-menu-header'>
                                            <NavLink tag={Link} to='/cart' className='text-dark'>
                                                <span className='total-item-card'>{cart.products.length}</span>
                                                <AiOutlineShoppingCart />
                                            </NavLink>
                                        </NavItem>
                                        <UncontrolledDropdown nav inNavbar className='text-center item-menu-header'>
                                            <DropdownToggle nav caret>
                                                <AiOutlineUser />
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    <NavLink className='text-dark'>
                                                        {user.FullName}
                                                    </NavLink>
                                                </DropdownItem>
                                                <DropdownItem>
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
