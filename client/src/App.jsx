import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homepage/homepage.component";
import { Header } from "./components/header/header.component";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
