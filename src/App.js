import '../src/css/App.css';
import AppRouter from './routes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
