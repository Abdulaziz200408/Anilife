import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Main from "./main";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
