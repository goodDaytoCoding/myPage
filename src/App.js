import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import AboutMe from "./pages/AboutMe";
import GitAddress from "./pages/GitAddress";
import Review from "./pages/Review";
import Stack from "./pages/Stack";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/aboutme" element={<AboutMe />} />
      <Route path="/gitaddress" element={<GitAddress />} />
      <Route path="/review" element={<Review />} />
      <Route path="/stack" element={<Stack />} />
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  );
}

export default App;
