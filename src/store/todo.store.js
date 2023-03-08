// importación de la clase Todo.
import { Todo } from "../todos/models/todo.model";

// Constante tipo Objeto que nos ayudara a filtrar la informacion de las tareas.
export const Filters = {
  All: 'All',
  Completed: 'Completed',
  Pending: 'Pending'
};

// Constante tipo Objeto que nos ayuda a almacenar las tareas, y la forma de filtara las tareas.
const state = {
  todos: [
    // new Todo('Priedra del alma'),
    // new Todo('Priedra del espacio'),
    // new Todo('Priedra del poder'),
    // new Todo('Priedra del realidad'),
    // new Todo('Priedra del tiempo'),
  ],
  filter: Filters.All,
};

// Funcion de flecha que inicia el la historia.
const initStore = () => {

  loadStore();
  console.log('InintStore🍑');

};

const loadStore = () => {

  if( !localStorage.getItem( 'state' ) ) return;

  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );

  state.todos = todos;
  
  state.filter = filter;

};

const saveStateToLocalStorage = () => {

  localStorage.setItem('state', JSON.stringify( state ))

};

const getTodo = ( filter = Filters.All ) => {

  switch( filter ){

    case Filters.All:
      return [...state.todos];

      case Filters.Completed:
      return state.todos.filter( todo => todo.done);

      case Filters.Pending:
      return state.todos.filter( todo => !todo.done);

      default:
        throw new Error(`The option ${ filter } is no valid.`);

  }

};

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {

  if( !description )
    throw new Error('Description is required');

  state.todos.push( new Todo(description));

  saveStateToLocalStorage();

};

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {

  state.todos = state.todos.map( todo => {
    
    /*
    if( todo.id === todoId ){

      todo.done = !todo.done;
    }
    */

    todo.id === todoId && (todo.done = !todo.done);

    return todo;

  });

  saveStateToLocalStorage();

};

/**
 * 
 * @param {String} todoID 
 */
const deleteTodo = ( todoId ) => {

  state.todos = state.todos.filter( todo => todo.id !== todoId);
  
  saveStateToLocalStorage();

};

const deleteCompleted = () => {

  state.todos = state.todos.filter( todo => !todo.done );

  saveStateToLocalStorage();

};

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {

  // state.filter = newFilter

  Object.keys(Filters).includes(newFilter) ?
    state.filter = newFilter :
    new Error('');

  saveStateToLocalStorage();
  

};

const getCurrentFilter = () => state.filter;

// exportacion por default en fomato Objeto.
export default {

  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodo,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,

};