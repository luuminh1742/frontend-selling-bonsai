import React from 'react'
import { Route, Switch } from 'react-router'
import Index from '../admin/Index'
import Login from '../admin/pages/Login'

function Admin() {
    return (
        <Switch>
            <Route path="/admin/login" >
                <Login />
            </Route>
            <Route path="/admin" >
                <Index />
            </Route>
        </Switch>
    )

}

export default Admin
