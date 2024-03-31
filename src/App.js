import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import ExpandedSpacePage from "./pages/expandedSpacePage/ExpandedSpacePage";
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
        <Route path="/space/:id" element={<ExpandedSpacePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
