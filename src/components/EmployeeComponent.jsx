import React, { Component } from 'react';
import './EmployeeComponent.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }
class EmployeeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             id:props.match.params.id,
            firstname:'',
            lastname:'',
            email:''

        }
        
        this.onChangeFirstNamehandler=this.onChangeFirstNamehandler.bind(this);
        this.onChangeLastNamehandler=this.onChangeLastNamehandler.bind(this);
        this.onChangeEmailhandler=this.onChangeEmailhandler.bind(this);
        this.saveOrUpdateEmployeehandler=this.saveOrUpdateEmployeehandler.bind(this);
        this.cancelEmployeehandler=this.cancelEmployeehandler.bind(this);

      }

      onChangeFirstNamehandler =(e)=>{
       this.setState({firstname:e.target.value});
      }

      onChangeLastNamehandler =(e)=>{
        this.setState({lastname:e.target.value});

      }
      onChangeEmailhandler =(e)=>{
        this.setState({email:e.target.value});
      }
      saveOrUpdateEmployeehandler =(e) =>{
        if(this.state.id == -1){
            e.preventDefault();

        let employee={
            firstname:this.state.firstname,
            lastname : this.state.lastname,
            email:this.state.email
           } 

            console.log('Employee -> ',JSON.stringify(employee));
            axios.post("http://localhost:8080/api/employee",employee).then(res=>{
            this.props.navigate('/emp-list');
            })

        }else{
            e.preventDefault();

        let employee={
            firstname:this.state.firstname,
            lastname : this.state.lastname,
            email:this.state.email
           } 

            // console.log('Employee -> ',JSON.stringify(employee));
            axios.put("http://localhost:8080/api/employee"+"/"+this.state.id,employee).then(res=>{
            this.props.navigate('/emp-list');
            })
          
            

      }
    }
      cancelEmployeehandler =()=>{
       this.props.navigate('/');
      }

      componentDidMount() 
      {
        if(this.state.id == -1){
            return
        }else{

            axios.get("http://localhost:8080/api/employee"+"/"+this.state.id).then((res)=>{
        console.log(res.data);
        let emp=res.data;
        this.setState({
            firstname:emp.firstname,
            lastname:emp.lastname,
            email:emp.email
        });
      })
        }
      
      }
    
      getTitle(){
        if(this.state.id == -1){
            return <h3 className='text-center'>Add Employee</h3>
        }else{
            return <h3 className='text-center'>Update Employee</h3>
        }
      }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6  offset-md-3 offset-md-3' id='form'>
                        {
                            this.getTitle()
                        }
                        <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>First Name:</label>
                                <input placeholder='e.g.,Phani' name='firstname' className='form-control' 
                                value={this.state.firstname} onChange={this.onChangeFirstNamehandler}></input>
                               

                            </div>
                            <div className='form-group'>
                            <label>Last Name:</label>
                                <input placeholder='e.g.,Madiraju' name='lastname' className='form-control' 
                                value={this.state.lastname} onChange={this.onChangeLastNamehandler}></input>

</div>
<div className='form-group'>
                                <label>Email:</label>
                                <input placeholder='e.g.,phani@gmail.com' name='email' className='form-control' 
                                value={this.state.email} onChange={this.onChangeEmailhandler}></input>
                                </div>
                                <button className='btn btn-success' id='btn-save' onClick={this.saveOrUpdateEmployeehandler}>Save</button>
                                <button className='btn btn-danger' id='btn-cancel' onClick={this.cancelEmployeehandler}>Cancel</button>
                        </form>
                        </div>
                        
                    </div>

                </div>
               
            </div>
        );
    }
}


export default withRouter(EmployeeComponent);