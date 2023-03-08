import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'; // podemos importar archivos html indicando que en raw(crudo) se ejecute
import { renderPending } from './use-cases';
import { renderTodos } from './use-cases/render-todos';
// Esta funcion lo tiene solamente vite

const elementHTML = {
  todoList: '.todo-list',
  newTodoInput: '#new-todo-input',
  clearCompletedButton: '.clear-completed',
  todoFilters: '.filtro',
  pedingAllCount: '#pending-count',
};

/**
 * Funcion que importa la arquitectura de HTML por JavaScript
 * @param {String} elementId 
 */
export const App = (elementId) => {

  // Creamos los elementos HTML del TODO
  const displayTodos = () => {

    const todos = todoStore.getTodo( todoStore.getCurrentFilter() );

    renderTodos( elementHTML.todoList, todos );

    updatePedingCount();

  }

  const updatePedingCount = () => {
    
    renderPending( elementHTML.pedingAllCount );

  }

  // Cuando la funcion App() se llama se auto ejecuta la funcion autoejecutable.
  (() => {

    const app = document.createElement('div');

    app.innerHTML = html ;

    document.querySelector(elementId).append(app);

    displayTodos()

  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector( elementHTML.newTodoInput );
  const todoListUl = document.querySelector( elementHTML.todoList );
  const clearCompletedBtn = document.querySelector( elementHTML.clearCompletedButton );
  const filtersLis = document.querySelectorAll( elementHTML.todoFilters );

  newDescriptionInput.addEventListener( 'keyup', ( event ) => {
    
    if( event.keyCode !== 13 ) return;
    
    if( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    
    displayTodos();

    event.target.value = '';
  });

  todoListUl.addEventListener( 'click', ( event ) => {

    const element = event.target.closest( '[data-id]' );
    
    todoStore.toggleTodo( element.getAttribute( 'data-id' ) );
    
    displayTodos();

  });

  todoListUl.addEventListener( 'click', ( event ) => {

    const isDestroyElement = event.target.className === 'destroy';

    const element = event.target.closest( '[data-id]' );

    if( !element || !isDestroyElement ) return;

    todoStore.deleteTodo( element.getAttribute( 'data-id' ) );

    displayTodos();

  });


  /* todoListUl.addEventListener( 'click', ( event ) => {

    const name = event.target.localName;

    const element = event.target.closest( '[data-id]' );
    
    const id = element.getAttribute( 'data-id');

    if( name === 'label' || name === 'input' ){
      
      todoStore.toggleTodo( id );

    }else if( name === 'button' ){

      todoStore.deleteTodo( id );

    }else{
      throw new Error('Acction not remenber.')
    }
    
    displayTodos();
  
  }); */

  clearCompletedBtn.addEventListener( 'click', ( event ) => {
    
    todoStore.deleteCompleted();

    displayTodos();
    
  });

  filtersLis.forEach( element => {

    element.addEventListener( 'click', (element) => {

      filtersLis.forEach( element => element.classList.remove('selected') );
      
      element.target.classList.add('selected');

      switch( element.target.text ){
        
        case 'Todos':
          todoStore.setFilter( Filters.All );
          break;
        case 'Pendientes':
          todoStore.setFilter( Filters.Pending );
          break;
        case 'Completados':
          todoStore.setFilter( Filters.Completed );
          break;
      }

      displayTodos();

    });

  });

};