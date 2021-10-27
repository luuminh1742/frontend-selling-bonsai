import React, { useState } from 'react'
import { Link, Switch, Route } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'


const Header = (props) => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    //---------------------

    const toggle = () => setIsOpen(!isOpen);
    const clickLogout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        
    }

    return (
        <div>
            <Navbar color="light" light expand="md" style={{ padding: '5px 10px' }}>
                <Switch>
                    <Route path="/admin/shop" >
                        <h4>Shop</h4>
                    </Route>
                    <Route path="/admin/bill" >
                        <h4>Bill</h4>
                    </Route>
                    <Route path="/admin/blog">
                        <h4>Blog</h4>
                    </Route>
                    <Route path="/admin/account">
                        <h4>Account</h4>
                    </Route>

                    <Route path="/admin" exact >
                        <h4>Dashboard</h4>
                    </Route>
                </Switch>

                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='flex-row-reverse'>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/components">Components</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {user.FullName}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={clickLogout}>
                                    Log out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header