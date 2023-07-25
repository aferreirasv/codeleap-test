import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import MainPage from "./pages/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
