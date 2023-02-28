import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages';
import { Sidebar } from './components';
import './App.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

function App() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-no-wrap">
        <Sidebar />
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
