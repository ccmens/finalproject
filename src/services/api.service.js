import { Config } from '../Config'
import axios from 'axios';

const httpClient = axios.create({
    baseURL: Config.appBaseUrl,
    timeout: 5 * 1e3,
});

const setHeaders = () => {
    const userinfo = localStorage.getItem('userinfo');
    const token = userinfo ? JSON.parse(userinfo).token : null;
    const datas = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return datas;
}

export async function register(formData) {
    try {
        const res = await httpClient.post(`/api/user/register`, formData, setHeaders());
        // console.log('register', res.data);
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function login(formData) {
    try {
        const res = await httpClient.post(`/api/user/login`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function logout(params) {
    try {
        const res = await httpClient.post(`/api/user/logout`, params, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function tokenLogin(params) {
    try {
        const res = await httpClient.post(`/api/user/tokenLogin`, params, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function profile(id, formData) {
    try {
        const res = await httpClient.put(`/api/user/profile/${id}`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function inactive(id, params) {
    try {
        const res = await httpClient.put(`/api/user/inactive/${id}`, params, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

// todo list
export async function todoList(params) {
    try {
        const res = await httpClient.get(`/api/todo`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function todoAdd(formData) {
    try {
        const res = await httpClient.post(`/api/todo`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function todoUpdate(id, formData) {
    try {
        const res = await httpClient.put(`/api/todo/${id}`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function todoDelete(id) {
    try {
        const res = await httpClient.delete(`/api/todo/${id}`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

// role list
export async function roleList(params) {
    try {
        const res = await httpClient.get(`/api/role`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

// user api list
export async function userList(params) {
    try {
        const res = await httpClient.get(`/api/user`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function userAdd(formData) {
    try {
        const res = await httpClient.post(`/api/user`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function userUpdate(id, formData) {
    try {
        const res = await httpClient.put(`/api/user/${id}`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function userDelete(id) {
    try {
        const res = await httpClient.delete(`/api/user/${id}`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

// category api list
export async function categoryList(params) {
    try {
        const res = await httpClient.get(`/api/category`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function categoryAdd(formData) {
    try {
        const res = await httpClient.post(`/api/category`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function categoryUpdate(id, formData) {
    try {
        const res = await httpClient.put(`/api/category/${id}`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function categoryDelete(id) {
    try {
        const res = await httpClient.delete(`/api/category/${id}`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

// item api list
export async function itemList(params) {
    try {
        const res = await httpClient.get(`/api/item`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function itemAdd(formData) {
    try {
        const res = await httpClient.post(`/api/item`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function itemUpdate(id, formData) {
    try {
        const res = await httpClient.put(`/api/item/${id}`, formData, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}

export async function itemDelete(id) {
    try {
        const res = await httpClient.delete(`/api/item/${id}`, setHeaders());
        return res.data;
    } catch (error) {
        throw error.response;
    }
}