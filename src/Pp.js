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
    const [profile, setProfile] = useState([]);

    const [errors , setErrors] = useState({})
     
    // const validate = (event, name, value) => {
    //     //A function to validate each input values

    //     switch (name) {
    //         case 'username':
    //             if(value.length <= 4){
    //                 // we will set the error state

    //                 setErrors({
    //                     ...errors,
    //                     username:'Username atleast have 5 letters'
    //                 })
    //             }else{
    //                 // set the error state empty or remove the error for username input

    //                 //omit function removes/omits the value from given object and returns a new object
    //                 let newObj = omit(errors, "username");
    //                 setErrors(newObj);
                    
    //             }
    //             break;
        
    //         case 'email':
    //             if(
    //                 !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
    //             ){
    //                 setErrors({
    //                     ...errors,
    //                     email:'Enter a valid email address'
    //                 })
    //             }else{

    //                 let newObj = omit(errors, "email");
    //                 setErrors(newObj);
                    
    //             }
    //         break;
            
    //         case 'password':
    //             if(
    //                 !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
    //             ){
    //                 setErrors({
    //                     ...errors,
    //                     password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
    //                 })
    //             }else{

    //                 let newObj = omit(errors, "password");
    //                 setErrors(newObj);
                    
    //             }
    //         break;
            
    //         default:
    //             break;
    //     }
    // }

    useEffect(() => {
        data()
    }, [])


    function data() {
        // let FD = new FormData();
        // FD.append('name', name);
        // FD.append('password', password);
        // FD.append('gmail', email);
        // // FD.append('photo', profile);
        axios.get(`http://localhost:8600/api/get/${id}`).then((res) => {
            setName(res.data.data.name)
            setEmail(res.data.data.gmail)
            setPassword(res.data.data.password)
            setProfile(res.data.data.photo_path)
            console.log("hbhj", res)
        })
    }

    const postData = () => {
        let FD = new FormData();
        FD.append('name', name);
        FD.append('password', password);
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