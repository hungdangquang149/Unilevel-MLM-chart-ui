import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OrgChartTree from './component/chart/chart'
import * as orgChartJson from "./data/org-chart.json";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <OrgChartTree data={orgChartJson} />
    </>
  )
}

export default App
