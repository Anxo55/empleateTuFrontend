import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Offer from '../models/Offer'
import { OfferService } from '../services/offer.Service'
import { useNavigate, useParams } from 'react-router-dom'
import { Temporal } from 'temporal-polyfill'
import toast from 'react-hot-toast'
import { CategoryService } from '../services/category.Service'
import Category from '../models/Category'

// formulario de creacion de una oferta
//actualizar una oferta
export default function OfferForm() {

const now = Temporal.Now.plainDateTimeISO()
const threeMonthLater = now.add({months: 3}).toString().slice(0,16)
// const threeMonthLater = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0,16)

const [form, setForm] = useState<Partial<Offer>>({
    title: '',
    description: '',
    active: true,
    contactEmail: '',
    location: '',
    published: new Date().toISOString().slice(0,16), //2007-11-03T16:18:05Z -> 2007-11-03T16:18
    expired: threeMonthLater,
    idCategory: undefined
  
})
const [categorias, setCategorias] = useState<Category[]>()

const {id} = useParams()
const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState(false)
const navigate = useNavigate()

useEffect(() => {

  if(id){
     
    setLoading(true)
    OfferService.getById(Number(id))
    .then(data => setForm({
      ...data,
      published: new Date(data.published || '').toISOString().slice(0,16),
      expired: new Date(data.expired || '').toISOString().slice(0,16)
    }))
    .catch((error) => setError(error.message))
    .finally(() => setLoading(false))
  }

}, [id])

useEffect(()=> {
  CategoryService.getAll()
 .then(setCategorias)
 .catch(error => setError(error.message))
}, [id])



const handleSubmit = (e: FormEvent) => {
  
  try {
    setLoading(true)
    setError(null)
  e.preventDefault()
  const formData = {
    ...form,
    idCategory: form.idCategory ? Number(form.idCategory) : null,
    published: new Date(form.published || '').toISOString(),
    expired: new Date(form.expired || '').toISOString()
  }
  if (id)  OfferService.update(Number(id), formData)
  else OfferService.create(formData)
  toast.success('Oferta guardada con exito')
  navigate('/offers')
} catch (error) {
  setError(error instanceof Error? error.message : 'Error desconocido')
  toast.error('Error al guardar la oferta')
}finally{
  setLoading(false)
}
  
  // OfferService.create(formData)
}

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setForm({
      ...form,
      [name]: checked,
    });
    
  };

  if(loading) return <p>Loading...</p>

  return (
    <div className='text-white flex flex-col'>OffertForm
      <h1>Insercion de nueva oferta</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        {error && <p>{error}</p>}

        <label>
          Titulo:
          <input name="title" value={form.title} onChange={handleChange} required/>
        </label>

        <label>
          Descripcion:
          <input name="description" value={form.description} onChange={handleChange}/>
        </label>

        <label>
          Email de contacto:
          <input name="contactEmail" value={form.contactEmail} onChange={handleChange}/>
        </label>

        <label>
          Location:
          <input name="location" value={form.location} onChange={handleChange}/>
        </label>

        <label>
          Fecha publicacion:
          <input type="datetime-local" name="published" value={form.published} onChange={handleChange}/>
        </label>

        <label>
          Fecha fin de publicacion:
          <input type="datetime-local" name="expired" value={form.expired} onChange={handleChange}/>
        </label>

        <label>
          Activa:
          <input type="checkbox" name="active" checked={form.active} onChange={handleChangeCheckbox}/>
        </label>

        <div>Id categoria</div>
        <select name="idCategory" value={form.idCategory ?? ''} onChange={handleChange}>
          <option>Selecciona una categoria</option>
          {categorias?.map(categoria => 
          <option key={categoria.id} value={categoria.id}>{categoria.name}</option>)}
        </select>

        <button>Guardar Oferta</button>

      </form>

      {/* <input type="datetime-local" value={form.published} /> */}
    </div>
  )
}
