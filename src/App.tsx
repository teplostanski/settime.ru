import { CurrentTime } from './components/CurrentTime';
import { VerbalTime } from './components/VerbalTime';
import './App.css';

export function App() {
  return (
    <div className="container">
      <VerbalTime />
      <CurrentTime />
    </div>
  );
}
