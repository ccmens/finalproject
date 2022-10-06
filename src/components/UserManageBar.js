import './ManageBar.css'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { Button } from 'antd'
export default function UserManageBar({
    handleLogout
}) {

    const NavActive = ({ isActive }) => {
        return isActive ? 'manage-menu-item active' : 'manage-menu-item';
    }

    return (
        <div className='manage-bar'>
            <NavLink className={NavActive} to='/profile'>Profile</NavLink>
            <NavLink className={NavActive} to='/items'>Item Management</NavLink>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}
