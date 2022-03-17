import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

export default function Pp() {
        const { id } = useParams();
        let history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ phone , setphone] = useState('')
    const [profile, setProfile] = useState([]);
    const [errors , setErrors] = useState({})
     
    
    useEffect(() => {
        data()
    }, [])


    function data() {
        axios.get(`http://localhost:8600/api/get/${id}`).then((res) => {
            setName(res.data.data.name)
            setEmail(res.data.data.gmail)
            setphone(res.data.data.phone)
            setPassword(res.data.data.password)
            setProfile(res.data.data.photo_path)
            console.log("hbhj", res)
        })
    }

    const postData = () => {
        let FD = new FormData();
        FD.append('name', name);
        FD.append('password', password);
        FD.append('phone', phone)
        FD.append('gmail', email);
        FD.append('photo', profile[0]);
        console.log("profile", profile);
        axios.post('http://localhost:8600/api', FD)
        history.push('/table')

    }
    const updatedata = () => {
        let FD = new FormData();
        FD.append('name', name);
        FD.append('password', password);
        FD.append('gmail', email);
        FD.append('phone', phone)
        FD.append('photo', profile[0]);
        console.log("profile", profile);
        axios.put(`http://localhost:8600/api/${id}`, FD)
        history.push('/table')

    }

    return (
        <div>
            data:{id}
            <div className='Container'>
                <img src={profile} alt='' height='100' width='100'></img>
                <form>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='password' >Password:</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='phone' >Password:</label>
                        <input value={phone} onChange={(e) => setphone(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label>Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <label>Choose Photo</label>
                    <input placeholder='profile' type='file' name='photo' onChange={(e) => setProfile(e.target.files)} />
                    <br />
                    <br />

                    <Button onClick={postData} type='submit'>Submit</Button>
                    <Button onClick={updatedata} type='submit'>update</Button>
                </form>
            </div>
        </div>
    )
}
