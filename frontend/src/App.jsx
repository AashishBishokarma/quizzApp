import { BrowserRouter as Router , Routes , Route } from 'react-router-dom' ;
import Home from './pages/Home';
import Topics from './pages/Topics';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import Leaderboard from './pages/Leaderborad';
import './App.css'

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="topics" element={<Topics/>}/>
        <Route path="/quiz" element={<QuizPage/>}/>
        <Route path="/result" element={<ResultPage/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
      </Routes>
    </Router>
  )
}

export default App;
