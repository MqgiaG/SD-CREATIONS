import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import Personalize from './components/Personalize/Personalize'
import HowToBuy from './components/HowToBuy/HowToBuy'
import Delivery from './components/Delivery/Delivery'
import Contact from './components/Contact/Contact'
import Cart from './components/Cart/Cart'
import Admin from './pages/Admin/Admin'

import './App.css'

function Store() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Products />
        <Personalize />
        <HowToBuy />
        <Delivery />
        <Contact />
      </main>

      <Cart />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Store />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App