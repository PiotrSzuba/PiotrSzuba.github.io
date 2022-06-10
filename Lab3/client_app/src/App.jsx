import React, { useState} from 'react';
import './styles/index.css'
import Navbar from './components/navbar'
import Footer from './components/footer';
import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdvertAdder from "./pages/AdvertAdder";
import GroupAdder from './pages/GroupAdder';
import Groups from "./pages/Groups";
import MessagePersonPage from "./pages/MessagePage";
import MessageGroupPage from "./pages/MessageGroupPage";
import Bookmark from "./pages/BookmarkPage";
import Login from './pages/LoginPage';
import Account from './pages/AccountPage';
import { userContext } from './contexts/usersContext';
import { auth } from "./firebase/init";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  document.title = "Lab4 - Home"

  const [user] = useAuthState(auth);
  const [,setLoggedUser] = useState("");

  return (
    <userContext.Provider value={[user,setLoggedUser]}>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddAdvert" element={<AdvertAdder />} />
            <Route path="/Groups" element={<Groups/>} />
            <Route path="/AddGroup" element={<GroupAdder/>} />
            <Route path="/MessagePersonPage/:id" element={<MessagePersonPage />} />
            <Route path="/MessageGroupPage/:id" element={<MessageGroupPage />} />
            <Route path="/Bookmark" element={<Bookmark />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Account" element={<Account />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;