import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css'
import NotFoundPage from './pages/NotFoundPage';


const App: React.FC = () => {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
     </Router>
    </div>
  );
}

export default App;
