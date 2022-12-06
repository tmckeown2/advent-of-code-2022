import {
  HashRouter,
  Routes, 
  Route 
} from "react-router-dom";
import NavBar from "./component/NavBar";
import HomePage from "./page/HomePage";
import DayPage from "./page/DayPage";

function App() {
  return (
    <>
    <NavBar />
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route path="" element={<HomePage />} />
          <Route path="day">
            <Route path=":dayId" element={<DayPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;
