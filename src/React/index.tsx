import * as React from 'react';
import { getRankingList } from './apiCalls/clmStats';
import App from './App';
import { createRoot } from 'react-dom/client';

async function render() {
  const rankingList = await getRankingList();

  const container = document.getElementById('app')
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App ranks={rankingList} />);
}

render();