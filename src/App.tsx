import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./components/home";
import UserCart from "./components/UserCart";
import ProductList from "./components/ProductList";
import {UserProfile} from "./components/UserProfile";
import {Store} from "./store";
import HocIndex from "./components/Hoc/hocIndex";
import UseApiJsx from "./customHooks/useApiJsx";
import {RouterIndex} from "./mobxStateRouter/routerIndex";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home store={Store}/>}>
                        <Route index element={<ProductList store={Store}/>}/>
                        <Route path="userCart/2" element={<UserCart store={Store}/>}/>
                        <Route path="myProfile/2" element={<UserProfile id={1} store={Store}/>}/>
                        <Route path="/hoc" element={<HocIndex/>}/>
                        <Route path="/useApi" element={<UseApiJsx/>}/>
                        <Route path='/routerIndex' element={<RouterIndex/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
        ;
}

export default App;
