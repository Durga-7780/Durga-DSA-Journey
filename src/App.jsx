import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import RoadmapPage from './pages/Roadmap.jsx';
import TopicPage from './pages/TopicPage.jsx';
import Patterns from './pages/Patterns.jsx';
import DecisionTree from './pages/DecisionTree.jsx';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/recognize" element={<DecisionTree />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
