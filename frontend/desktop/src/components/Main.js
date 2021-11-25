import React, { Fragment, Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import Home from "./Home";
import history from './history';
import AdminDashboard from './Admin/AdminDashboard';
import AddAdmins from './Admin/AddAdmins';
import AddTeachers from './Admin/AddTeachers';
import AddStudents from './Admin/AddStudents';
import TeacherCreateExam from './Teacher/CreateExams';
import DisplayTeachers from './Admin/DisplayTeachers';
import DisplayStudents from './Admin/DisplayStudents';
import DisplayAdmins from './Admin/DisplayAdmins';
import TeacherViewExam from './Teacher/ViewExams';
import StudentViewExam from './Student/ViewExam';
import TeacherDashboard from './Teacher/TeacherDashboard';
import StudentDashboard from './Student/StudentDashboard';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    render() {
        return (
            <Router history={history}>
                <Fragment>
                    <Switch>
                        <Route exact path="/home" component={() => <Home />}></Route>
                        <Route exact path="/admin" component={() => <AdminDashboard />}></Route>
                        <Route exact path="/teacher" component={() => <TeacherDashboard />}></Route>
                        <Route exact path="/student" component={() => <StudentDashboard />}></Route>
                        <Route exact path="/admin/students" component={() => <AddStudents />}></Route>
                        <Route exact path="/admin/teachers" component={() => <AddTeachers />}></Route>
                        <Route exact path="/admin/admins" component={() => <AddAdmins />}></Route>
                        <Route exact path="/admin/display/admins" component={() => <DisplayAdmins />}></Route>
                        <Route exact path="/admin/display/teachers" component={() => <DisplayTeachers />}></Route>
                        <Route exact path="/admin/display/students" component={() => <DisplayStudents />}></Route>
                        <Route exact path="/teacher/createExam" component={() => <TeacherCreateExam />}></Route>
                        <Route exact path="/teacher/viewExam" component={() => <TeacherViewExam />}></Route>
                        <Route exact path="/student/viewExam" component={() => <StudentViewExam />}></Route>
                        <Route exact path="/*" component={() => <Home />}></Route>
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default Main;
