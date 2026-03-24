import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Productos from './pages/Productos'
import NavBar from './components/NavBar'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'sonner'
import Cart from './components/Cart'

function Layout({ children }) {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
      <NavBar />
      <main className='flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
      <footer className='w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-8 mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm'>&copy; {new Date().getFullYear()} JL Store. Realizado usando ReactJS y TailwindCSS.</p>
          <p className='text-sm text-slate-500'>Proyecto de aprendizaje Front-End</p>
        </div>
      </footer>
    </div>
  )
}

function App() {

  return (
    <CartProvider>
      <BrowserRouter className=''>
        <Toaster position='bottom-right'></Toaster>
        <Routes>
          <Route path='/' element={<Layout> <Home /> </Layout>} />
          <Route path='/productos' element={<Layout> <Productos></Productos> </Layout>} />
          <Route path={`/productos/:id`} element={<Layout> <ProductDetail /> </Layout>} />
          <Route path={`/cart`} element={<Layout> <Cart /> </Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
