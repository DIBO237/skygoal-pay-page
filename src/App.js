import logo from './logo.svg';

import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import BankPayment from "./components/BankPayment"
import OnlinePayment from "./components/OnlinePayment"

import Header from './components/Header';

function App() {
  return (
    <div className="">
      
      <ToastContainer />
      <Header /> 
      <Router>
      <Routes>
       
        <Route path="/" element={<Home />}>
       
          <Route path="bank"  element={<BankPayment />} />
          <Route path="onlinepayment" element={<OnlinePayment />} />
         
        </Route>
      </Routes>
    </Router>

    </div>
  );
}

export default App;


