import './App.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import { useDispatch } from 'react-redux';
import { getQuestionsBySearch } from './actions/questions';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();


  const searchQuestions = () => {
    if (search.trim()) {
      dispatch(getQuestionsBySearch({ search }));
      history.push(`/questions?searchQuery=${search || "none"}`);
    } else {
      history.push('/');
    }
  }

  return (
    <div>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSignup={isSignup} setIsSignup={setIsSignup} setSearch={setSearch} search={search} searchQuestions={searchQuestions} />
      {isOpen && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="Container">
        <Home isSignup={isSignup} setIsSignup={setIsSignup} setIsOpen={setIsOpen} setSearch={setSearch} search={search} searchQuestions={searchQuestions} />
      </div>
    </div>
  );
}

export default App;
