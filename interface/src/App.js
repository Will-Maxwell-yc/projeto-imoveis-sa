import { BrowserRouter, Routes, Route } from 'react-router-dom'
//components
import NavBar from './components/Navbar/index.jsx';
import Footer from '../src/components/Footer/index.jsx'

// Pages
import Login from './Pages/Login/Login.js'
import LoginConsultor from './Pages/LoginConsultor/LoginConsultor.js'
import Cadastrar from './Pages/Register/Cadastrar.js'
import Home from './Pages/Home/Home.js'
import Imoveis from './Pages/Imoveis/Imoveis.js'
import SobreNos from './Pages/SobreNos/SobreNos.js'
import AnunciarImovel from './Pages/Anunciar/AnunciarImovel.js'
import Imovel from './Pages/Imovel/Imovel.js'
import PageCorretor from './Pages/Corretor/index.jsx'
import Favoritos from './Pages/Favoritos/Favoritos.jsx'
import Visitas from './Pages/Visitas/index.jsx';
import Propostas from './Pages/Propostas/Propostas.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/imoveis' element={<Imoveis />} />
          <Route path='/corretores' element={<PageCorretor />} />
          <Route path='/sobrenos' element={<SobreNos />} />
          <Route path='/anunciarimovel' element={<AnunciarImovel />} />
          <Route path='/imovel' element={<Imovel />} />
          <Route path='/login' element={<Login />} />
          <Route path='/loginconsultor' element={<LoginConsultor />} />
          <Route path='/cadastrar' element={<Cadastrar />} />
          <Route path='/favoritos' element={<Favoritos />} />
          <Route path='/visitas' element={<Visitas />} />
          <Route path='/propostas' element={<Propostas />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Cadastrar />} />
          <Route path='/home' element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
