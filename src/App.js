import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Map from './components/pages/Map';
import Home from './components/pages/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <div>
          
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/map" element={<Map />} />

          </Routes>
    
        </div>
      </Router>
    </div>
     
      
    
  );
}

export default App;
