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
import Reviews from "./pages/reviews/Reviews";
import BookingHistory from "./pages/bookingHistory/BookingHistory";
import ExpandedHistoryPage from "./pages/expandedSpacePage/ExpandedHistoryPage";
import ContactOwner from "./pages/contactOwner/ContactOwner";
import AddOfficeSpaceForm from "./pages/add/add";
import EditOfficeSpaceForm from "./pages/edit/edit";
import MySpaces from "./pages/mySpaces/mySpaces";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/spaces" element={<List/>}/>
        <Route path="/booking-history" element={<BookingHistory/>}/>
        <Route path="/add" element={<AddOfficeSpaceForm/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myspaces" element={<MySpaces/>}/>
        <Route path="/myspaces/:id" element={<EditOfficeSpaceForm/>}/>
        <Route path="/space/:id" element={<ExpandedSpacePage />} />
        <Route path="/reviews/:id" element={<Reviews/>} />
        <Route path="/booking-history/:id" element={<ExpandedHistoryPage/>}/>
        <Route path="/contact/:id" element={<ContactOwner/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
