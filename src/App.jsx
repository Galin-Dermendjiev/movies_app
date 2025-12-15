
import './App.css'
import Search from "./components/Search.jsx";
import {useState} from "react";

function App() {
    const [searchTerm, setSearchTerm] = useState('')

  return (
    <main>
        <div className="pattern" />
        <div className="wrapper">
            <header>
                <img src='../public/hero-img.png' alt='hero' />
                <h1>Find <span className="text-gradient">movies</span> you'll enjoy fast and easy</h1>
            </header>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
        </div>
    </main>
  )
}

export default App
