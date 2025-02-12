import Offer from "../models/Offer";
import {fetchAPI} from "../utils/fetchApi";
const API_URL_BASE = import.meta.env.VITE_API_BASE_URL


export class CategoryService {
  
  
  static async getAll() {
    return await fetchAPI(API_URL_BASE+"/categories")
  }


  static async create(offer:Partial<Offer>) {
    
      return await fetchAPI(API_URL_BASE+"/offers/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offer),
        credentials: 'include',
      });
  }

  static async getById(id:number) {
    return await fetchAPI(API_URL_BASE+"/offers/"+id)
  }

  static async update(id: number, offer:Partial<Offer>) {
    return await fetchAPI(API_URL_BASE+"/offers/"+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offer),
      credentials: 'include',
    });
  }

  static async delete(id: number) {
    return await fetchAPI(API_URL_BASE+"/offers/"+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
  }
  
}
