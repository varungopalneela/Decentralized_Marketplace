import './App.css';
import {Route, RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Root from './components/Root';
import Home from './components/Home';
import Signin from './components/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Electronics from './components/Electronics';
import Foods from './components/Foods';
import FoodMenu from './components/FoodMenu';
import Cart from './components/Cart';
import Protected from './components/Protected';
import { Carousel } from 'bootstrap';
import Carosel from './components/Carosel';
import OrderPage from './components/OrderPage'

function App() {
  let Router=createBrowserRouter(createRoutesFromElements(

    <Route path='/' element={<Root/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/profile' element={<Protected><Profile/></Protected>}></Route>
      <Route path='/orders' element={<Protected><OrderPage/></Protected>}></Route>
      <Route path='/electronics' element={<Electronics/>}></Route>
      <Route path='/foods' element={<Foods/>}></Route>
      <Route path='/foods/:restaurant' element={<FoodMenu/>}></Route>
      <Route path='/cart' element={<Protected><Cart/></Protected>}></Route>
      <Route path='/carosel' element={<Carosel/>}></Route>
    </Route>
  ));

  return (
    <div className="App">
      <RouterProvider router={Router}/>
    </div>
  );
}

export default App;
