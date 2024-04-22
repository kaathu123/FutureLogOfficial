import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CourseView from "./pages/courseView/CourseView";
import Application from "./pages/Application/Application";
import PackgeListView from "./pages/PackageListView/PackageListView";
import AgentList from "./Components/AgentList/AgentList";
import RequestPage from "./pages/RequestPage/RequestPage";
import BookingView from "./pages/BookingView/BookingView";
import Editprofile from "./pages/EditProfile";
import Compliant from "./pages/Compliant";
import CollegeList from "./pages/CollegeList";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/header/Header";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <>
      <Navbar />
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CourseView/:Id" element={<CourseView />} />
        <Route path="/Application" element={<Application />} />
        <Route path="/AgentList" element={<AgentList />} />
        <Route path="/PackageList/:Id" element={<PackgeListView />} />
        <Route path="/RequestPage/:pId" element={<RequestPage />} />
        <Route path="/bookingView" element={<BookingView />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/Compliant" element={<Compliant />} />
        <Route path="/CollegeList" element={<CollegeList />} />
        <Route path="/MyBooking" element={<MyBookings />} />
      </Routes>
    </>
  );
}
export default App;
