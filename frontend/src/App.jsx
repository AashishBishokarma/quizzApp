import { BrowserRouter as Router , Routes , Route } from 'react-router-dom' ;
import Home from './pages/Home';
import Topics from './pages/Topics';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import Leaderboard from './pages/Leaderborad';
import Layout from './components/Layout';
import './App.css'

function App() {

  return (
    

  <Router>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/topics" element={<Layout><Topics /></Layout>} />
      <Route path="/quiz" element={<Layout><QuizPage /></Layout>} />
      <Route path="/result" element={<Layout><ResultPage /></Layout>} />
      <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
    </Routes>
  </Router>



    
  )
}

export default App;
