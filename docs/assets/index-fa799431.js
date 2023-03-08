(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function c(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(o){if(o.ep)return;o.ep=!0;const s=c(o);fetch(o.href,s)}})();let w;const L=new Uint8Array(16);function C(){if(!w&&(w=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!w))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return w(L)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function S(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:E};function A(e,t,c){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||C)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){c=c||0;for(let o=0;o<16;++o)t[c+o]=d[o];return t}return S(d)}class h{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const i={All:"All",Completed:"Completed",Pending:"Pending"},l={todos:[new h("Priedra del alma"),new h("Priedra del espacio"),new h("Priedra del poder"),new h("Priedra del realidad"),new h("Priedra del tiempo")],filter:i.All},P=()=>{v(),console.log("InintStore🍑")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=i.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},k=(e=i.All)=>{switch(e){case i.All:return[...l.todos];case i.Completed:return l.todos.filter(t=>t.done);case i.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`The option ${e} is no valid.`)}},U=e=>{if(!e)throw new Error("Description is required");l.todos.push(new h(e)),f()},x=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},I=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},M=()=>{l.todos=l.todos.filter(e=>!e.done),f()},O=(e=i.All)=>{Object.keys(i).includes(e)?l.filter=e:new Error(""),f()},q=()=>l.filter,u={addTodo:U,deleteCompleted:M,deleteTodo:I,getCurrentFilter:q,getTodo:k,initStore:P,loadStore:v,setFilter:O,toggleTodo:x},D=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        \r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        \r
        <label for="toggle-all">Mark all as complete</label>\r
        \r
        <ul class="todo-list">\r
            \r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            \r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            \r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        \r
        </ul>\r
    \r
    </section>\r
    \r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    \r
    <footer class="footer">\r
        \r
        <!-- This should be "0 items left" by default -->\r
        \r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        \r
        <!-- Remove this if you don't implement routing -->\r
        \r
        <ul class="filters">\r
            \r
            <li>\r
                \r
                <a class="filtro selected" href="#/">Todos</a>\r
            \r
            </li>\r
            \r
            <li>\r
                \r
                <a class="filtro" href="#/active">Pendientes</a>\r
            \r
            </li>\r
            \r
            <li>\r
                \r
                <a class="filtro" href="#/completed">Completados</a>\r
            \r
            </li>\r
        \r
        </ul>\r
        \r
        <!-- Hidden if no completed items are left ↓ -->\r
        \r
        <button class="clear-completed">Borrar completados</button>\r
    \r
    </footer>\r
\r
</section>\r
\r
<footer class="info">\r
    \r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    \r
    <!-- Change this out with your name and url ↓ -->\r
    \r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    \r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
\r
</footer>`,F=e=>{if(!e)throw new Error("A TODO object is required");const{id:t,description:c,done:d,createdAt:o}=e,s=`
    <div class="view">
      <input class="toggle" type="checkbox" ${d?"checked":""}>
      <label>${c}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `,a=document.createElement("li");return a.innerHTML=s,a.setAttribute("data-id",t),d&&a.classList.add("completed"),a};let b;const H=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=u.getTodo(i.Pending).length};let g;const V=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(c=>{g.append(F(c))})},m={todoList:".todo-list",newTodoInput:"#new-todo-input",clearCompletedButton:".clear-completed",todoFilters:".filtro",pedingAllCount:"#pending-count"},N=e=>{const t=()=>{const n=u.getTodo(u.getCurrentFilter());V(m.todoList,n),c()},c=()=>{H(m.pedingAllCount)};(()=>{const n=document.createElement("div");n.innerHTML=D,document.querySelector(e).append(n),t()})();const d=document.querySelector(m.newTodoInput),o=document.querySelector(m.todoList),s=document.querySelector(m.clearCompletedButton),a=document.querySelectorAll(m.todoFilters);d.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(u.addTodo(n.target.value),t(),n.target.value="")}),o.addEventListener("click",n=>{const p=n.target.closest("[data-id]");u.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",n=>{const p=n.target.className==="destroy",y=n.target.closest("[data-id]");!y||!p||(u.deleteTodo(y.getAttribute("data-id")),t())}),s.addEventListener("click",n=>{u.deleteCompleted(),t()}),a.forEach(n=>{n.addEventListener("click",p=>{switch(a.forEach(y=>y.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":u.setFilter(i.All);break;case"Pendientes":u.setFilter(i.Pending);break;case"Completados":u.setFilter(i.Completed);break}t()})})};u.initStore();N("#app");
