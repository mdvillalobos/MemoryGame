import './assets/css/App.css'
import { Route, Routes } from "react-router-dom"
import GamePage from "./pages/GamePage/GamePage"


const App = () => {    

    return (
        <Routes>
            <Route path='/' element={<GamePage/>}/>
        </Routes>
    )
}

export default App
