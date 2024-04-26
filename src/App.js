import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './registration';
import SuccessPage from './SuccessPage';
import UserList from './list';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={RegistrationForm}></Route>
        <Route path='/success' Component={SuccessPage}></Route>
        <Route path='/lists' Component={UserList}></Route>
      </Routes>
    </Router>
  );
}

export default App;
