/* eslint-disable default-case */
/* eslint-disable no-useless-escape */

import React, { useEffect, useState } from 'react'
import {
    Grid, Paper, TextField, FormControl, FormLabel, Radio, FormControlLabel, RadioGroup, InputLabel, MenuItem, Select,
    Checkbox, FormGroup
} from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
// import { Message } from '@material-ui/icons'
import { omit } from 'lodash'
const Om = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setphone] = useState('')
    const [profile, setProfile] = useState([]);
    const [errors, setErrors] = useState('');
    const [values , setValues] = useState({
        name: '',
        email:"",
        phone:"",
        password:''
    })
    const { id } = useParams()
    let history = useHistory();
    useEffect(() => {
        getuser()

    }, [])

    const getuser = () => {
        console.log("id----------", id)
        if (id === undefined || id === null) {
        } else {
            axios.get(`http://localhost:8600/get/${id}`).then((result) => {
                console.log("result.data", result)
                if (result.data.success === true) {
                    setName(result.data.data[0].name)
                    setEmail(result.data.data[0].gmail)
                    setPassword(result.data.data[0].password)
                    setphone(result.data.data[0].phone)
                    setProfile(result.data.data[0].photo)
                } else {
                    return;
                }

            })
        }
    }
    const postData = () => {

        let FD = new FormData();
        // FD.append('name', name);
        // FD.append('phone', phone);
        // FD.append('gmail', email);
        // FD.append('password', password);
        // FD.append('profile_file', profile[0]);
        // console.log("profile", profile);
        // axios.post('http://localhost:8600/', FD)
        // history.push("/table")
    }
    // function updatebackenddat() {
    //     let FD = new FormData();
    //     FD.append('name', name);
    //     FD.append('phonenumber', phonenumber);
    //     FD.append('email', email);
    //     FD.append('age', age);
    //     FD.append('profile_file', profile[0]);

    //     if (id === undefined || id === null) {
    //         return;
    //     } else {
    //         axios.put(`http://localhost:9000/api/${id}`, FD).then((res) => {
    //             console.log("updare", res)

    //         })
    //     }
    //     history.push('/')

    // }

    const validate = (event, name, value) => {

        switch (name) {
            case 'name':
                if (
                    !new RegExp(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        name: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
                    })
                } else {

                    let newObj = omit(errors, "name");
                    setErrors(newObj);

                }
                break;
            case 'email':
                if (
                    !new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
                case 'phone':
                    if (
                        !new RegExp(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/).test(value)
                    ) {
                        setErrors({
                            ...errors,
                            phone: 'Mobile number must be 10 digits.'
                        })
                    } else {
    
                        let newObj = omit(errors, "phone");
                        setErrors(newObj);
    
                    }
                    break;
                    case 'password':
                        if (
                            !new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)
                        ) {
                            setErrors({
                                ...errors,
                                password: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
                            })
                        } else {
        
                            let newObj = omit(errors, "password");
                            setErrors(newObj);
        
                        }
                        break;

        }
    }

    const handleChange = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]:val,
        })

    }


    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }


    return (
        <div>Form - {id}
            <Grid>

                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Information Form</h2>
                    </Grid>
                    <form>
                        <TextField name='name' fullWidth label='Name' value={values.name} onChange={handleChange} error={Boolean(errors.name)} helperText={errors.name} />
                        <TextField name='phone' fullWidth label='phone' value={values.phone} onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone} />
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                        <TextField name='password' fullWidth label='password' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password}  />
                        <br />
                        <TextField name="profile" type="file" onChange={(e) => setProfile(e.target.files)} />
                        <br />
                        <Grid align='center'>
                            <Button type='submit' class='btn btn-info' onClick={postData}>submit</Button>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Om