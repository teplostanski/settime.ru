import { CurrentTime } from './components/CurrentTime';
import { VerbalTime } from './components/VerbalTime';
import './App.css';

export function App() {
  return (
    <div className="container">
      <div className="container-inner">
        <div className="clock-row">
          <div className="clock-anchor">
            <CurrentTime />
          </div>
        </div>
        <VerbalTime />
      </div>
    </div>
  );
}
