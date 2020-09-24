import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
              private toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle){

    let existe = false;
    let mensaje = '';

    for(const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter ( peli => peli.id !== pelicula.id);
      mensaje = 'Borrado de favoritos';
      this.presentToast(mensaje);
    }else{
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a favoritos';
      this.presentToast(mensaje);
    }


 
    this.storage.set('peliculas', this.peliculas);
    return !existe;
  }

  async cargarFavoritos(){
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id){

    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);


    /* if(existe){
      return true;
    }else{
      return false;
    } */
    //Esto es lo mismo que lo de arriba
    return (existe) ? true: false;
  }


}
