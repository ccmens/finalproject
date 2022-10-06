import './ManageBar.css'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { Button } from 'antd'
export default function AdminManageBar({
    handleLogout
}) {
    const NavActive = ({ isActive }) => {
        return isActive ? 'manage-menu-item active' : 'manage-menu-item';
    }
    return (
        <div className='manage-bar'>
            <NavLink to='/userlist' className={NavActive}>User Management</NavLink>
            <NavLink to='/items' className={NavActive}>Item Management</NavLink>
            <NavLink to='/category' className={NavActive}>Category Management</NavLink>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}
