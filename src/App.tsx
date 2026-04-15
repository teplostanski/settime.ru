import { CurrentTime } from './components/CurrentTime';
import { GlassCard } from './components/GlassCard';
import { VerbalTime } from './components/VerbalTime';
import './App.css';

const App = () => {
  return (
    <div className="appShell">
      <div className="appShell__grid">
        <div className="appShell__cardA">
          <GlassCard header={<VerbalTime />}>
            <CurrentTime />
          </GlassCard>
        </div>
        <div className="appShell__cardB">
          <GlassCard header={<VerbalTime text={'aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaaaa ffffffffffffffff    ffffffffffff fffffffff'}/>}>
            <CurrentTime />
          </GlassCard>
        </div>
        <div className="appShell__cardC">
          <GlassCard header={<VerbalTime />}>
            <CurrentTime />
          </GlassCard>
        </div>
        <div className="appShell__cardD">
          <GlassCard header={<VerbalTime />}>
            <CurrentTime />
          </GlassCard>
        </div>
        <div className="appShell__cardE">
          <GlassCard header={<VerbalTime />}>
            <CurrentTime />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export { App };
