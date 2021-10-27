import React from 'react'
import { Route, Switch } from 'react-router'
import Shop from '../pages/Shop'
import Bill from '../pages/Bill'
import Blog from '../pages/Blog'
import Account from '../pages/Account'
import Dashboard from '../pages/Dashboard'
import Header from '../components/Header'
import '../components/styles/Content.css'

function Content() {
    return (
        <div className='__page_content_wrapper'>
            <Header />

            <Switch>
                <Route path="/admin/shop" component={Shop}/>
                <Route path="/admin/bill" component={Bill}/>
                <Route path="/admin/blog" component={Blog}/>
                <Route path="/admin/account" component={Account}/>
                <Route path="/admin" exact component={Dashboard} />
            </Switch>
        </div>
    )
}

export default Content
