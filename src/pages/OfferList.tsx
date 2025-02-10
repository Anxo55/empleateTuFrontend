import { ChangeEvent, useEffect, useState } from "react";
import Offer from "../models/Offer";
import { OfferService } from "../services/offer.Service";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function OfferList() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // const [search, setSearch] = useState('')
  // const [title, setTitle] = useState(null)

  const [queryParams, setQueryParams] = useSearchParams();
  const titleQuery = queryParams.get("title") || "";

  useEffect(() => {
    OfferService.search(titleQuery)
      .then(setOffers)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [titleQuery]);

  // Funcionalidad de filtrar por titulo de la oferta
  /* useEffect(() =>{
     OfferService.getAll()
      .then(setOffers)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
      
   }, [search]) */
  // const filteredOffers = offers?.filter((offer) => offer.title.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setQueryParams(newTitle ? { title: newTitle } : {});
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Estas seguro que quieres borrar esta oferta?"))
      return;
    
    try {
      await OfferService.delete(id);
      setOffers(offers.filter((offer) => offer.id!== id));
      toast.success("Oferta borrada con exito")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido")
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="text-white flex flex-col items-center">
      <h1>Listado de ofertas</h1>
      <input
        placeholder="Buscar oferta"
        value={titleQuery}
        onChange={handleSearchChange}
      />
      <button className="cursor-pointer">Buscar oferta</button>
      <Link to="/offers/new">Añadir nueva oferta</Link>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {offers?.length === 0 && <p>No hay ofertas disponibles</p>}
      {offers?.map((offer) => (
        <div key={offer.id}>
          {offer.title}
          <Link to={`/offers/${offer.id}`}>Ver</Link>
          <Link to={`/offers/edit/${offer.id}`}>Editar</Link>
          <button onClick={() => handleDelete(offer.id)}>Borrar</button>
        </div>
      ))}
    </div>
  );
}
