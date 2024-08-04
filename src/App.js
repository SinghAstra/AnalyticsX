import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Feeds from "./components/Feeds";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/AuthContext";
import Analytics from "./pages/Analytics";
import Bookmarks from "./pages/Bookmarks";
import CreatePost from "./pages/CreatePost";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Theme from "./pages/Theme";
import "./styles/App.css";

function App() {
  const { isAuthenticated, isAuthenticating } = useContext(AuthContext);

  if (isAuthenticating) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <div className="main-container">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Feeds />} />
              <Route exact path="/explore" element={<Explore />} />
              <Route exact path="/notifications" element={<Notifications />} />
              <Route exact path="/messages" element={<Messages />} />
              <Route exact path="/bookmarks" element={<Bookmarks />} />
              <Route exact path="/analytics" element={<Analytics />} />
              <Route exact path="/theme" element={<Theme />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/create-post" element={<CreatePost />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
