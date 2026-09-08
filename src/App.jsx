import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import Personalize from './components/Personalize/Personalize'
import HowToBuy from './components/HowToBuy/HowToBuy'
import Delivery from './components/Delivery/Delivery'
import Contact from './components/Contact/Contact'
import './App.css'

function App() {
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
    </>
  )
}

export default App