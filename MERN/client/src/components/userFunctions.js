import axios from 'axios';

export const register = newUser => {
    return axios
    .post('users/register',{
        name: newUser.name,
        email: newUser.email,
        pass: newUser.pass
    })
    .then(res => {
        console.log(`Registered ${newUser.name}`)
    })
}

export const login = user => {
    return axios
    .post('users/login', {
        email: user.email, 
        pass: user.pass
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}