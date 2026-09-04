import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import Personalize from './components/Personalize/Personalize'
import './App.css'

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Products />
        <Personalize />
      </main>
    </>
  )
}

export default App