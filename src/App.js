import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import defaultTheme from "./theme";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import ExpandedSpacePage from "./pages/expandedSpacePage/ExpandedSpacePage";
import Reviews from "./pages/reviews/Reviews";
import BookingHistory from "./pages/bookingHistory/BookingHistory";
import ExpandedHistoryPage from "./pages/expandedSpacePage/ExpandedHistoryPage";
import ContactOwner from "./pages/contactOwner/ContactOwner";
import AddAdSpaceSpaceForm from "./pages/add/Add";
import EditAdSpaceSpaceForm from "./pages/edit/Edit";
import MySpaces from "./pages/mySpaces/MySpaces";
import Stats from "./pages/stats/Stats";
import PolicyPage from "./pages/policyEnforcement/Policy";
import ApproveSpacesPage from "./pages/approveSpaces/ApproveSpaces";
import ContactAdminForm from "./pages/contactAdmin/ContactAdmin";
import EndpointRequestsTable from "./pages/platformHealth/EndpointRequestTable";
import AddReviewForm from "./pages/reviews/AddReview";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/spaces" element={<List/>}/>
                    <Route path="/booking-history" element={<BookingHistory/>}/>
                    <Route path="/add" element={<AddAdSpaceSpaceForm/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/myspaces" element={<MySpaces/>}/>
                    <Route path="/myspaces/:id" element={<EditAdSpaceSpaceForm/>}/>
                    <Route path="/space/:id" element={<ExpandedSpacePage/>}/>
                    <Route path="/reviews/:id" element={<Reviews/>}/>
                    <Route path="/create-review/:id" element={<AddReviewForm/>}/>
                    <Route path="/booking-history/:id" element={<ExpandedHistoryPage/>}/>
                    <Route path="/contact/:id" element={<ContactOwner/>}/>
                    <Route path="/contact-us" element={<ContactAdminForm/>}/>
                    <Route
                      path="/admin/stats"
                      element={
                        <AdminRoute>
                          <Stats />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/policy-enforcement"
                      element={
                        <AdminRoute>
                          <PolicyPage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/review-spaces"
                      element={
                        <AdminRoute>
                          <ApproveSpacesPage />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/platform-health"
                      element={
                        <AdminRoute>
                          <EndpointRequestsTable />
                        </AdminRoute>
                      }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;