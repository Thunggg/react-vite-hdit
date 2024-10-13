import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'
import TodoApp from './components/todolist/todoApp'


function App() {
  

  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  )
}

export default App
