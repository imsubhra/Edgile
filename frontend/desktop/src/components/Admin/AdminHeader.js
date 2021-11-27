import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function AdminHeader(props) {
    return (
        <Fragment>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Departmental Admin Dashboard</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><Link to="/admin/teachers">Add Teachers</Link></li>
                    <li><Link to="/admin/students"> Add Students</Link></li>
                    <li><Link to="/admin/admins">Add Departmental Admins</Link></li>
                    <li><Link to="/admin/display/teachers">Display Teachers</Link></li>
                    <li><Link to="/admin/display/students">Display students</Link></li>
                    <li><Link to="/admin/display/admins">Display Department Admins</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </Fragment>
    );
}