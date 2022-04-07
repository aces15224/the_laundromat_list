import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";

export const AuthContext = createContext();

const App =()=> {
  const [login, setLogin] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const loginFunction = ()=> setLogin(!login);
  const nameFunction = name => setBusinessName(name);
  return (
    <Router>
      <AuthContext.Provider value={{login, businessName, loginFunction, nameFunction}}>
        <Switch>
          {/* <Route path="/about" component={AboutPage}/> */}

          {/* <Route path="/business/dashboard/:business" component={DashBoard} />
          <Route path="/business/laundromat/:businessName" component={DefaultPage} />
          <Route path="/business" component={BusinessPage} />

          <Route path="/contact" component={Contact} /> */}
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/sign-up">
            <SignUpPage/>
          </Route>
          {/* <Route path="/:category/:zipCode" component={SearchPage} /> */}
          <Route path="/" component={Home} />
          {/* <Route path="*" component={NotFound}/>   */}
        </Switch> 
      </AuthContext.Provider>
      
    </Router>   
  );

}

export default App;