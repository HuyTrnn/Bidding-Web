import Home from './components/Home';
import RegisterPage from './components/RegisterPage';
import MainPage from './components/MainPage';
import AddProduct from './components/AddProduct';
import BidProduct from './components/BidProduct';
import Products from './components/Products';
import ListProduct from './components/ListProduct';
import ContactPage from './components/ContactPage';
import FundPage from './components/FundPage';
import Admin from './components/Admin';
import Nav from './components/Nav';
import socketIO from 'socket.io-client';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React, {useState} from 'react';
import AdminPage from './components/Admin';

const socket = socketIO.connect('http://localhost:4000');

function App() {
    

    const [username, setUserName] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);
    }

    const Logout = () => {
        console.log("logout");
    }

    return (
        <Router>
            <div>
                {/* Nav is available at the top of all the pages as a navigation bar */}
                {/* <Nav socket={socket} /> */}
                <Routes>
                    <Route path="/" element={<Home socket={socket}/>} />
                    <Route path="/register" element={<RegisterPage socket={socket}/>} />
                    <Route path="/mainpage" element={<MainPage socket={socket} />} />
                    <Route path="/products" element={<Products socket={socket} />} />
                    <Route path="/list" element={<ListProduct socket={socket} />} />
                    <Route path="/contact" element={<ContactPage socket={socket} />} />
                    <Route path="/fund" element={<FundPage socket={socket} />} />
                    <Route
                        path="/products/add"
                        element={<AddProduct socket={socket} />}
                    />
                    {/* Uses dynamic routing */}
                    <Route
                        path="/products/bid/:name/:price"
                        element={<BidProduct socket={socket} />}
                    />
                    <Route path="/admin" element={<AdminPage/>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;