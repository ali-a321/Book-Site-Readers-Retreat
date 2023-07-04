import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddBook from "./pages/AddBook"
import UpdateBook from "./pages/UpdateBook"
import OrderConfirmation from './pages/OrderConfirmation';
import Homepage from './pages/Homepage';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Homepage/>} />
          <Route path = "/add" element = {<AddBook/>} />
          <Route path = "/update/:id" element = {<UpdateBook/>} />
          <Route path = "/orderconfirmation" element = {<OrderConfirmation/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
