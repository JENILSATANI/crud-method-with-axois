import React, { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

export default function Om() {
    const { id } = useParams();
    let history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState([]);


    const postData = () => {
        let FD = new FormData();
        FD.append('name', name);
        FD.append('password', password);
        FD.append('gmail', email);
        FD.append('photo', profile[0]);
        console.log("profile", profile);
        axios.post('http://localhost:8600/api/', FD)
        history.push('/table')

    }
    return (
        <div>
            data:{id}
            <div className=''>
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
                        <label>Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <label>Choose Photo</label>
                    <input placeholder='profile' type='file' name='photo' onChange={(e) => setProfile(e.target.files)} />
                    <br />
                    <Button onClick={postData} type='submit'>Submit</Button>
                </form>
                <br />

            </div>
        </div>
    )
}