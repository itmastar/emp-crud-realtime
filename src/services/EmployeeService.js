import axios from 'axios';

const EMPLOYEE_GET_URL="http://localhost:8080/api/employees"

class EmployeeService{

    getEmployees(){
       return  axios.get(EMPLOYEE_GET_URL);
    }
}

export default new EmployeeService();