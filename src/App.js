import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Feeds from "./components/Feeds";
import FeedSection from "./components/Profile/FeedSection";
import PostsSection from "./components/Profile/PostsSection";
import SavedSection from "./components/Profile/SavedSection";
import TaggedSection from "./components/Profile/TaggedSection";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/AuthContext";
import Analytics from "./pages/Analytics";
import Bookmarks from "./pages/Bookmarks";
import CreatePost from "./pages/CreatePost";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import ProfilePage from "./pages/ProfilePage";
import Reels from "./pages/Reels";
import RegistrationPage from "./pages/RegistrationPage";
import Responsive from "./pages/Responsive";
import Search from "./pages/Search";
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
        <div className="main-container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Feeds />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/explore" element={<Explore />} />
            <Route exact path="/reels" element={<Reels />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route exact path="/bookmarks" element={<Bookmarks />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/theme" element={<Theme />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route path="/profile/" element={<PostsSection />} />
              <Route path="/profile/feed" element={<FeedSection />} />
              <Route path="/profile/saved" element={<SavedSection />} />
              <Route path="/profile/tagged" element={<TaggedSection />} />
            </Route>
            <Route exact path="/create-post" element={<CreatePost />} />
            <Route exact path="/responsive" element={<Responsive />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/accounts/signup" element={<RegistrationPage />} />
          <Route path="*" element={<Navigate to="/accounts/signup" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
