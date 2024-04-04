import React from "react";
import Navbar from "./Nav/navbar";
import Main from "./main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App(){


    return(
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<Main />} />
            </Routes>
        </Router>
    );
}

export default App;
