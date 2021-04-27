import './App.css';
import Button from 'react-bootstrap/Button';
import Login from './Components/login'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Login></Login>
      <Button variant="outline-primary">Primary</Button>

    </div>
  );
}

export default App;
