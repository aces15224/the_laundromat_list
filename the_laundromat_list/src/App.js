import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import BusinessPage from "./pages/business";
import SearchPage from "./pages/SearchPage";
import Contact from "./pages/contact";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import DashBoard from "./pages/Dashboard";
import DefaultPage from "./landingPages/userPages/DefaultPage";
import AboutPage from "./pages/about";
import NotFound from "./pages/NotFound";
import './App.css';

export const AuthContext = createContext();

const App = ()=>{
  //login is initially false, and is used to determine if user is logged in or not
  const [login, setLogin] = useState(false);

  const [businessName, setBusinessName] = useState("");

  //loginFunction is passed down as a prop and serves to log in/out the user when a login/logout button is clicked
  const loginFunction = ()=> setLogin(!login);

  //nameFunction is passed down to the user dashboard and is used to update the business name, if changed
  const nameFunction = name => setBusinessName(name);

  //when the app loads, it automatically determines if the user is logged in or not and sets state accordingly
  useEffect(()=>{
    fetch("/api/checkAuthentication")
        .then((response)=>response.json())
        .then(data => {
            if(data.authenticated === true){
                setLogin(true);
                setBusinessName(data.user)
            } 
        })
  },[])

  return (
    <Router>
      {/* Context provider surrounds all pages because it is used in the navbar (displayed on all pages) */}
        <AuthContext.Provider value={{login, businessName, loginFunction, nameFunction}}>
          <Routes>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/business/dashboard/:business" element={<DashBoard/>} />
            <Route path="/business/laundromat/:businessName" element={<DefaultPage/>} />
            <Route path="/business/dry-cleaning/:businessName" element={<DefaultPage/>} />
            <Route path="/business" element={<BusinessPage/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<LoginPage/>}/>
              {/* <LoginPage/>
            </Route> */}
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/:category/:zipCode" element={<SearchPage/>} />
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<NotFound/>}/>  
          </Routes>
        </AuthContext.Provider>
    </Router>          
  );
}
    

export default App;