import './styles/index.scss'
import Navbar from './components/Navbar/navbar'
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdvertAdder from "./pages/AdvertAdder";


const App = () => {
  document.title = "Lab3"
  return (
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddAdvert" element={<AdvertAdder />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;