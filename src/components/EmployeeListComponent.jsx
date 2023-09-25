import React, { Component } from 'react';

import axios from 'axios';



  


class EmployeeListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees:[]

        }
        this.addEmployee=this.addEmployee.bind(this);
        this.updateClickHandler=this.updateClickHandler.bind(this);
        this.deleteClickHandler=this.deleteClickHandler.bind(this);
      }
      
      
    componentDidMount(){
        // EmployeeService.getEmployees.then((res) =>{
        //     this.setState({employees:res.data})
        // });
        axios.get('http://localhost:8080/api/employees')
        .then((res) =>{
            this.setState({employees:res.data});
            console.log(res.data);
        });
      
    }
    addEmployee = () =>{
        this.props.navigate('/emp/-1')
    }
    updateClickHandler = (id)=>{
        this.props.navigate(`/emp/${id}`)
    }
    deleteClickHandler = (id) => {
        axios.delete('http://localhost:8080/api/employee'+'/'+id)
        .then((res) =>{
            this.setState({employees:this.state.employees.filter(employee => employee.id !==id)});
            
        });
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Employee List</h2>
                <div >
                    <button className='btn btn-primary' onClick={()=>this.addEmployee(-1)}>Add Employee</button>
                </div>
                <div className='row'>
                    <table className='table table-striped'>
                        <thead className='thead-dark '>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{

                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.email}</td>
                                        <button className='btn btn-info secondary' onClick={()=>this.updateClickHandler(employee.id)}>Update</button>
                                        <button style={{marginLeft:'10px'}} className='btn btn-danger secondary' onClick={()=>this.deleteClickHandler(employee.id)} >Delete</button>
                                    </tr>
                                )

                                }
                            
                            

                        </tbody>

                    </table>

                </div>
            </div>
        );
    }
}

export default EmployeeListComponent;