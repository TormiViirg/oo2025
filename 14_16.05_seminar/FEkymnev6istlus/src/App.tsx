import Menu from './components/Menu'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ManageAthletes from './pages/ManageAthlete'
import EditAthleteDetails from './pages/EditAthleteDetails'
import Map from './pages/Map'

function App() {

  return (
    <>
      <Menu/>
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/map" element={ <Map /> } />

        <Route path="/admin/addAthlete" element={ <ManageAthletes /> } />
        <Route path="/admin/addAthleteResults/:athleteId" element={ <EditAthleteDetails /> } />

        <Route path="/*" element={ <div>Page not found</div> } />
      </Routes>
    </>
  )
}

export default App
