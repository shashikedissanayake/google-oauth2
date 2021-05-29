import './App.css';
import Button from './components/googleButton';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route path="/" component={Button} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
