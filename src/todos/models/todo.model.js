// uuid es un generador ID que nos facilitael generar ID para almacenamitos.
import {v4 as uuid} from 'uuid';

export class Todo {

  /**
   * Creacion de los componetes necesario a almacenar el la aplicacion
   * de las tareas por hacer.
   * @param {String} description Requiere una descripcion por texto para su almacenamiento.
   */
  constructor( description ){

    this.id = uuid();
    this.description = description;
    this.done = false;
    this.createdAt = new Date();

  }

}