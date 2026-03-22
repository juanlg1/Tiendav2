import { useEffect, useState } from 'react'

const useProducts = (endpoint) => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const url = `https://fakestoreapi.com/${endpoint}`
    const getProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)
        setProducts(json || [])
      } catch (error) {
        console.log(error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getProducts()
  }, [endpoint])

  return { products, error, isLoading }

}

export default useProducts