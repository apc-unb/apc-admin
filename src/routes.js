import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import SchoolClass from './pages/schoolClass'
import Student from './pages/student'
import Home from './pages/home'
import Exam from './pages/exam'
import News from './pages/news'




function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component= { Home } />
                <Route exact path = "/news" component= { News } />
                <Route exact path = "/exams" component= { Exam } />
                <Route exact path = "/students" component= { Student } />
                <Route exact path = "/classes" component= { SchoolClass } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes