import './App.scss';
import { Routes, Route} from 'react-router-dom';
import { HomePage } from './pages/homepage/homepage.component';

const App = () => {
  return (
    <div className="App">

      <div className="pages">
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;