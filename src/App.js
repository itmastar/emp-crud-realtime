
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeListComponent from './components/EmployeeListComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import withNavigation from './components/withNavigation';

function App() {
  const EmployeeListComponentwithNavigation= withNavigation(EmployeeListComponent);
  const EmployeeComponentwithNavigation=withNavigation(EmployeeComponent);
  return (
    <div>
    <HeaderComponent/>
    
    <div className="container">
    <Router>
      <Routes>
        <Route  path="/"  element={<EmployeeListComponentwithNavigation/>}></Route>
        <Route  path="/emp-list"  element={<EmployeeListComponentwithNavigation/>}></Route>
        <Route  path="/emp/:id" element={<EmployeeComponentwithNavigation/>}></Route>
        </Routes>
    </Router>
        
      
    </div>
    <FooterComponent/>
    </div>
  );
}

export default App;
