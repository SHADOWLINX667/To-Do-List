import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import NotFound from './pages/NotFound';
import styles from './App.module.css';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
