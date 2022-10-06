import './User.css';
import { Table, Tag, Button, Space, message } from 'antd';
import React, { useState, useEffect } from 'react';
import {
    userList as userListAPI, userAdd, userUpdate, userDelete,
    roleList as roleListAPI
} from '@services/api.service';
import UserForm from './UserForm';
import ConfirmComponent from '@components/ConfirmComponent';
import moment from 'moment';

async function HandleAction(action, id, params) {
    try {
        if (action === 'add') {
            await userAdd(params);
        } else if (action === 'update') {
            await userUpdate(id, params);
        } else if (action === 'delete') {
            await userDelete(id);
        }
        message.success('Handle action success');
        return true;
    } catch (error) {
        const text = `handle action is error: ${error?.data?.message || 'please try again'}`;
        console.log(text);
        message.error(text);
        return false;
    }
}

export default function UserList() {

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    const showModal = (row) => {
        setCurrentRow(row);
        setIsFormVisible(true);
    };

    const getStatus = (status) => {
        var text = status ? "active" : "inactive";
        var color = status ? "#87d068" : "#f50";
        return (<Tag color={color}>{text}</Tag>);
    }

    const columns = [
        {
            title: 'Index',
            dataIndex: 'key',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role_name',
            render: (_, row) => row.role.role_name,
        },
        {
            title: 'Name',
            render: (_, row) => (
                <span>{row.first_name} {row.last_name}</span>
            ),
        },
        {
            title: 'Create At',
            dataIndex: 'created_at',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm')
        },
        {
            title: 'Active',
            dataIndex: 'active',
            render: (text) => getStatus(text),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, row) => (
                <Space size="middle">
                    <Button onClick={() => showModal(row)}>Edit</Button>
                    <Button type="danger" onClick={() =>
                        ConfirmComponent(async () => {
                            await HandleAction('delete', row._id, null);
                            setLoading(true);
                        })
                    }>Delete</Button>
                </Space>
            ),
        }
    ];

    useEffect(() => {
        if (!loading) {
            return;
        }
        setCurrentRow(null);
        setIsFormVisible(false);
        setLoading(false);
        async function getUserList() {
            try {
                const result = await userListAPI();
                const list = result.data.map((item, index) => ({ ...item, key: index + 1 }));
                setUserList(list);
            } catch (error) {
                console.log('getUserList is error: ', error.message);
            }
        }
        getUserList();
        async function getRoleList() {
            try {
                const result = await roleListAPI();
                setRoleList(result.data);
            } catch (error) {
                console.log('getRoleList is error: ', error.message);
            }
        }
        getRoleList();
    }, [loading]);

    const handleSubmit = async (values) => {
        const result = currentRow ? await HandleAction('update', currentRow._id, values) : await HandleAction('add', null, values);
        if (result) {
            setLoading(true);
        } else {
            console.log('handleSubmit is error');
        }
    }

    return (
        <>
            <div className='user-list-wrap'>
                <h3 className='common-title'>User List</h3>
                <Button type="primary" size='large' onClick={() => showModal(null)}>Add</Button>
                <UserForm
                    handleSubmit={handleSubmit}
                    isFormVisible={isFormVisible}
                    setIsFormVisible={setIsFormVisible}
                    currentRow={currentRow}
                    roleList={roleList}
                />
                <Table columns={columns} dataSource={userList}/>
            </div>
        </>
    );
}