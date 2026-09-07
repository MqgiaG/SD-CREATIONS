import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import Personalize from './components/Personalize/Personalize'
import HowToBuy from './components/HowToBuy/HowToBuy'
import Delivery from './components/Delivery/Delivery'
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
      </main>
    </>
  )
}

export default App