import './styles/index.scss'
import Navbar from './components/Navbar/navbar'
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdvertAdder from "./pages/AdvertAdder";
import GroupAdder from './pages/GroupAdder';
import Groups from "./pages/Groups";
import MessagePersonPage from "./pages/MessagePage";
import MessageGroupPage from "./pages/MessageGroupPage";


const App = () => {
  document.title = "Lab3 - Home"
  return (
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddAdvert" element={<AdvertAdder />} />
            <Route path="/Groups" element={<Groups/>} />
            <Route path="/AddGroup" element={<GroupAdder/>} />
            <Route path="/MessagePersonPage/:id" element={<MessagePersonPage />} />
            <Route path="/MessageGroupPage/:id" element={<MessageGroupPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;