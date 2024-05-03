import {
  Route,
  Routes,
} from '../../../../../node_modules/react-router-dom/dist/index';
import AboutMe from './pages/AboutMe';
import GitAddress from './pages/GitAddress';
import Main from './pages/Main';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';
import Review from './pages/Review';
import Stack from './pages/Stack';

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
