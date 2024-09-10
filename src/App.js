import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Meals from "./Components/Meals/Meals";
import Profile from "./Components/Pages/Profile";
import HomePage from "./Components/Pages/HomePage";
import { AuthProvider } from './Components/Auth/AuthContext';

function App() {
  // const [cartIsShown, setCartIsShown] = useState(false);

  // const showCartHandler = () => {
  //   setCartIsShown(true);
  // };

  // const hideCartHandler = () => {
  //   setCartIsShown(false);
  // };

  return (
    <AuthProvider>
        <Router>
          <main>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/meals" element={<Meals/>} />
              <Route path="/users/profile" element={<Profile />} />
            </Routes>
          </main>
        </Router>
    </AuthProvider>
  );
}

export default App;
