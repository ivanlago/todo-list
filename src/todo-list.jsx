import './todo-list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from './NotFoundPage';
import ListTasks from './List/list-tasks';
import Register from './Register/register';
import Update from './Update/update';


function TodoList() {
  return (
     <Routes>
        <Route path="/" element={<ListTasks />} />
        <Route path="register" element={<Register />} />
        <Route path="update" element={<Update />} />         

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />         
    </Routes>     
  ); 
}

export default TodoList;
