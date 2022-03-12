import React, { Component } from 'react'
import axios from 'axios'
// import { useHistory } from "react-router-dom";

export default class Upload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedField: '',
            id: this.props.match.params.id

        }
    }
    // let history = useHistory();

    myHandler = (events) => {
        this.setState({
            selectedField: events.target.files[0]
        })

    }

    submitHandler = async (event) => {
        event.preventDefault();
        var url = 'http://localhost:9600/api/';
        const formdata = new FormData();
        formdata.append('photo', this.state.selectedField)
        let response = await axios.put(url, formdata)
        this.props.history.push("/table");

    }
    // submitHandler = async (event) => {
    //     event.preventDefault();
    //     var url = 'http://localhost:8600/user/6228875a054012eda80195f0';
    //     const formdata = new FormData();
    //     formdata.append('photo',this.state.selectedField)
    //     axios.put(url,formdata)
    //         .then(response => {
    //             console.log("Status: ", response.status);
    //             console.log("Data: ", response.data);
    //         }).catch(error => {
    //             console.error('Something went wrong!', error);

    //         });
    //         this.props.history.push("/table");
    // }
    // submitHandler = item => {
    //     axios.put(`http://localhost:8600/user/${item.id}`, item)
    //       .then(res => {
    //         this.setState({items: res.data});
    //     })
    //     .catch(err => console.log(err));
    //     this.props.history.push('/table');
    //   }
    // updatdata = (id)=>{
    //     axios.put(`http://localhost:8600/user/622866fa90fb8b6a51e23c49`).then((res)=>{
    //         console.log(res)
    //         this.props.history.push("/table");

    //     })
    // }
    handleClick = (id) => {

        axios.delete(`http://localhost:9600/user/`).then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result)
        });
    }

    render() {
        return (
            <div>
                {/* <div> */}
                id={this.props.match.params.id}

                <form onSubmit={this.submitHandler}>
                    <input type='file' name='photo' onChange={this.myHandler} />
                    <input type='submit' value="upload" onChange={this.updatdata} />
                    <button onClick={() => { this.handleClick() }} className="delete-btn">Delete</button>

                </form>

            </div>
            // </div>

        )
    }
}