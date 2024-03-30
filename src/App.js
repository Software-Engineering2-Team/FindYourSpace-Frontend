import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import AddOfficeSpaceForm from "./pages/add/add";
import EditOfficeSpaceForm from "./pages/edit/edit";
import ReservationsTable from "./pages/reservations/reservations"
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/spaces" element={<List/>}/>
        {/* <Route path="/spaces/:id" element={<EditOfficeSpaceForm/>}/> */}
        {/* <Route path="/add" element={<AddOfficeSpaceForm/>}/> */}
        {/* <Route path="/reservations/:id" element={<ReservationsTable/>}/> */}
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
