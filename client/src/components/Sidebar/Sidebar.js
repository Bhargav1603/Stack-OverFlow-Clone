import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }) {
    const user = JSON.parse(localStorage.getItem('profile'))


    return (
        <div className="Sidebar" style={{ width: `${isOpen ? "40%" : "15%"}` }} >

            <div className="SidebarMenu">
                <div className="SidebarItem">
                    <NavLink exact="true" activeClassName='active' onClick={() => setIsOpen(false)} className="SidebarLinks" to='/questions'>Questions</NavLink>
                </div>
                <div className="SidebarItem">
                    <NavLink exact="true" activeClassName='active' onClick={() => setIsOpen(false)} className="SidebarLinks" to='/tags'>Tags</NavLink>
                </div>
                {(user && user?.result.email === "bhanunelluri0829@gmail.com") && <div className="SidebarItem">
                    <a exact="true" activeClassName='active' onClick={() => setIsOpen(false)} className="SidebarLinks" href='https://stack-over-cloned.herokuapp.com/admin'>Admin</a>
                </div>}

                {/* <div className="SidebarItem">
                    <NavLink exact="true" activeClassName='active' onClick={() => setIsOpen(false)} className="SidebarLinks" to='/users'>Users</NavLink>
                </div>
                <div className="SidebarItem">
                    <NavLink exact="true" activeClassName='active' onClick={() => setIsOpen(false)} className="SidebarLinks" to='/jobs'>Jobs</NavLink>
                </div> */}

            </div>
        </div >
    )
}
