import { ChangeEvent, useEffect, useState } from 'react'
import Offer from '../models/Offer'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { OfferService } from '../services/offer.Service'

function OfferList() {
  const [offers, setOffers] = useState<Offer[]>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  //const [titleQuery, setTitleQuery] = useState(null)

  const [queryParams, setQueryParams] = useSearchParams()
  const titleQuery = queryParams.get('title') || ''

  useEffect(()=>{
    OfferService.search(titleQuery)
          .then(setOffers)
          .catch((error)=>setError(error.message))
          .finally(()=>setLoading(false))
    
  },[titleQuery])

  const handleSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setQueryParams(newTitle ? {title: newTitle} : {})
  }
  
  const handleDelete = async (id:number) => {
    if(!window.confirm('¿Estás seguro que quieres borrar esta oferta?')) return

    try{
      await OfferService.delete(id)
      setOffers(offers?.filter(offer => offer.id !== id))
      toast.success('Oferta borrada correctamente!')
    }catch(error){
      setError(error instanceof Error ? error.message : 'Error desconocido')
    }
  }

  return (
    <div  className='text-white flex flex-col items-center'>
      <h1>Lista de ofertas</h1>
      {/* <button className='bg-blue-600 border-1 rounded-2xl hover:bg-white hover:text-blue-600'>
      <Link to="/offers/new">Añadir nueva oferta</Link>
      </button> */}
      
      <input value={titleQuery} onChange={handleSearchChange} placeholder='Buscar por título'/>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {offers?.length === 0 && <p>No hay ofertas disponibles</p>}
      {offers?.map(offer => 
          <div key={offer.id} className=''>
            {offer.title}
            <Link to={`/offers/${offer.id}`}>Ver</Link>
            <Link to={`/offers/edit/${offer.id}`}>Editar</Link>
            <button onClick={()=>handleDelete(offer.id)} className='bg-red-600 rounded-2xl text-gray-300 cursor-pointer'>Borrar</button>
          </div>
      )}
      <button className='bg-blue-600 border-1 rounded-2xl hover:bg-white hover:text-blue-600 m-8'>
      <Link to="/offers/new">Añadir nueva oferta</Link>
      </button>
      
    </div>
  )
}

export default OfferList