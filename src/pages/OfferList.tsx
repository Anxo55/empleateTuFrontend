import { ChangeEvent, useEffect, useState } from 'react';
import Offer from '../models/Offer';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { OfferService } from '../services/offer.Service';

function OfferList() {
  const [offers, setOffers] = useState<Offer[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useSearchParams();
  const titleQuery = queryParams.get('title') || '';

  useEffect(() => {
    OfferService.search(titleQuery)
      .then(setOffers)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [titleQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setQueryParams(newTitle ? { title: newTitle } : {});
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro que quieres borrar esta oferta?')) return;

    try {
      await OfferService.delete(id);
      setOffers(offers?.filter((offer) => offer.id !== id));
      toast.success('Oferta borrada correctamente!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    <div className='text-white flex flex-col items-center p-6 bg-gray-900 min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Lista de Ofertas</h1>
      
      <input 
        value={titleQuery} 
        onChange={handleSearchChange} 
        placeholder='Buscar por título' 
        className='mb-4 p-2 w-80 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {loading && <p className='text-gray-300'>Cargando...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {offers?.length === 0 && <p className='text-gray-400'>No hay ofertas disponibles</p>}
      
      <div className='w-full max-w-2xl'>
        {offers?.map((offer) => (
          <div key={offer.id} className='bg-gray-800 p-4 rounded-lg mb-3 flex justify-between items-center shadow-md'>
            <span className='text-lg font-semibold'>{offer.title}</span>
            <div className='flex gap-2'>
              <Link to={`/offers/${offer.id}`} className='bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600'>Ver</Link>
              <Link to={`/offers/edit/${offer.id}`} className='bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600'>Editar</Link>
              <button 
                onClick={() => handleDelete(offer.id)} 
                className='bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700'>
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Link 
        to='/offers/new' 
        className='bg-green-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-green-600'>
        Añadir nueva oferta
      </Link>
    </div>
  );
}

export default OfferList;
