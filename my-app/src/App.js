 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Pagesnotfound from './pages/Pagesnotfound';
import Home from './pages/Home';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import About from './pages/About';
import Footer from './Components/Footer';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './Components/Route/Private';
import Dashboard from './pages/user/Dashboard';
import AdminPrivate from './Components/Route/AdminPrivate';
import AdminDashboard from './pages/admin/AdminDashboard';
import Createshop from './pages/admin/Createshop';
import Createfood from './pages/admin/Createfood';
// import Update from './pages/admin/Updateshop';
import Updateshop from './pages/admin/Updateshop';
import CreateProduct from './pages/admin/CreateProduct';
import Updatefood from './pages/admin/Updatefood';
import Mycart from './pages/user/Mycart';
import Menu from './pages/Menu';

 
 
function App() {
 
   
  return (
   <>
   <BrowserRouter>
   <Toaster/>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>

    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='user' element={<Dashboard/>}/> 
    <Route path='cart/user' element={<Mycart/>}/> 

    </Route>
    <Route path='/dashboard' element={<AdminPrivate/>}>
    <Route path='admin' element={<AdminDashboard/>}/> 
    <Route path='/dashboard/admin/create-shop' element={<Createshop/>}/> 
     <Route path='/dashboard/admin/update-shop/:id' element={<Updateshop/>}/>
    <Route path='/dashboard/admin/get-food' element={<Createfood/>}/> 
    <Route path='/dashboard/admin/create-food' element={<CreateProduct/>}/> 
    <Route path='/dashboard/admin/update-food/:id' element={<Updatefood/>}/> 

    </Route>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/menu' element={<Menu/>}/>

     <Route path='*' element={<Pagesnotfound/>}/>
   </Routes>

   <Footer/>
   </BrowserRouter>

   </>
  );
} 

export default App;
 
