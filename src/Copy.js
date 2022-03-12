
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Copy() {
    const [user, setuser] = useState([])
    useEffect(() => {
        // localStorage.removeItem('_id');
        data()
    }, [])
    let history = useHistory();

    function data() {

        axios.get(`http://localhost:8600/api/`)
            .then(res => {
                console.log(res)
                const tableData = res.data.data
                // const array = [];
                // array.push(tableData);
                setuser(tableData)
                console.log(user)

            })
    }
    function deleteuser(_id) {
        console.log(_id);
        axios.delete(`http://localhost:8600/api/${_id}`).then((result) => {
            console.log("result.data", result);

        })

    }
    function updateuser(_id) {
        console.log(_id);
        // localStorage.setItem('_id', _id);
        history.push(`${_id}`);

    }

    const columns = [
         {
             title:'name',field:"name"
         },
         {
            title:"gmail",field:"gmail"
         },
         {
            title:"password",field:"password"

         },
        {
            title: "_id", field: "_id"
        },
        {
            title:"photo",field:"photo_path", render: (rowData) => <img src={rowData.photo_path} style={{ width: 60, height:60 }} alt='' />,

        }
    ]



    return (

        <div>

            <MaterialTable title=" Material Table"

                data={user}
                columns={columns}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        editable: "rowData",
                        onClick: (event, rowData) => updateuser(rowData._id),


                    },

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteuser(rowData._id)

                    }
                ]}
            />

            {/* <button><Link to='/update/'>submit</Link></button> */}

        </div>
    )
}




export default Copy