import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Productos from './pages/Productos'
import NavBar from './components/NavBar'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'sonner'

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className='max-w-7xl bg-slate-50 mx-auto mb-4'>
        {children}
      </div>
      <footer className='w-full bg-slate-900 p-6 text-slate-50 h-20'>
        <p className='text-center'>JL {new Date().getFullYear()} @ Todos los derechos reservados</p>
      </footer>
    </>
  )
}

function App() {

  return (
    <CartProvider>
      <BrowserRouter className=''>
        <Toaster position='top-right'></Toaster>
        <Routes>
          <Route path='/' element={<Layout> <Home /> </Layout>} />
          <Route path='/productos' element={<Layout> <Productos></Productos> </Layout>} />
          <Route path={`/productos/:id`} element={<Layout> <ProductDetail /> </Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
