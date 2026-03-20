import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Productos from './pages/Productos'


function Layout({ children }) {
  return (
    <>
      <header className='bg-red-200 flex justify-between'>
        <div>
          <p>JL</p>
        </div>
        <div>
          <Link to={'/'}>
            Inicio
          </Link>
          <Link to={'/productos'}>
            Productos
          </Link>
        </div>
        <div>

        </div>
      </header>
      {children}
      <footer>Pie de pagina</footer>
    </>
  )
}

function App() {

  return (
    <BrowserRouter className=''>
      <Routes>
        <Route path='/' element={<Layout> <Home /> </Layout>} />
        <Route path='/productos' element={<Layout> <Productos></Productos> </Layout>} />
        <Route path='/detalle-producto' element={<Layout> <ProductDetail /> </Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
