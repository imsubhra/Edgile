import React, { Component, Fragment } from 'react';
import AdminHeader from './AdminHeader';
import { Breadcrumb, BreadcrumbItem, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
class AdminDashboard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         sample : ""
    //     }
    // }
    // componentDidMount() {
        
    // }
    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    <AdminHeader />
                    <div id="content">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home"><i className="fa fa-home fa-sm"></i> Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active> Departmental Admin</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>Departmental Admin Dashboard</h3>
                                <hr />
                            </div>
                        </div>
                        <Jumbotron>
                            <div>
                                <h1>Welcome.. Departmental Admin</h1>
                                <p>
                                Departmental Admin can add Students, Teachers and other Departmental Admins.
                                </p>
                            </div>
                        </Jumbotron>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AdminDashboard;
