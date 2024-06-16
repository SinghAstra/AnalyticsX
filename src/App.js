import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import RootLayout from "./layout/RootLayout";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
