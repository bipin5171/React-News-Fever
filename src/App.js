import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";

const App =()=> {
 const  apiKey=process.env.REACT_APP_NEWS_API
  
    return (
      <div>
        <Router>
          <Navbar></Navbar>

          
          <Routes>
          <Route path="/general"   element={<News pageSize="10" country="in" category="general" key="general" apiKey={apiKey}></News>} ></Route>
            <Route exact  path="/"   element={<News pageSize="10" country="in" category="general" key="general" apiKey={apiKey}></News>} ></Route>
            <Route  exact path="/sports"   element={<News pageSize="10" country="in" category="sports" key="sports" apiKey={apiKey}></News>} ></Route>
            <Route exact  path="/science"   element={<News pageSize="10" country="in" category="science" key="science" apiKey={apiKey}></News>} ></Route>
            <Route exact  path="/health"   element={<News pageSize="10" country="in" category="health" key="health" apiKey={apiKey}></News>} ></Route>
            <Route  exact path="/technology"   element={<News pageSize="10" country="in" category="technology" key="technology" apiKey={apiKey}></News>} ></Route>
            <Route exact  path="/business"   element={<News pageSize="10" country="in" category="business" key="business" apiKey={apiKey}></News>} ></Route>
            <Route  exact path="/entertainment"   element={<News pageSize="10" country="in" category="entertainment" key="entertainment" apiKey={apiKey}></News>} ></Route>
          </Routes>
        </Router>
      </div>
    );
  
}
export default App;
