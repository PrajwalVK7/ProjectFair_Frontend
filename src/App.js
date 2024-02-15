import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <>

    <Routes>
    <Route path='/'  element={<Home/>} />    
      <Route path='/login'  element={<Auth />} />
      <Route path='/register'  element={<Auth register={"register"} />} />
      <Route path='/project'  element={<Project/>} /> 
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
