import React, { Component, Fragment } from 'react';
import TeacherHeader from './TeacherHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
class TeacherDashboard extends Component {
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <TeacherHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Teacher</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Teacher Dashboard</h3>
                                <hr />
                            </div>
                        </div>
                        <Jumbotron>
                            <div>
                                <h1>Welcome! Teacher</h1>
                                <p>
                                    Teacher can conduct exams here!!
                                </p>
                            </div>
                        </Jumbotron>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TeacherDashboard;
