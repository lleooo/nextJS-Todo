"use client";

import Todo from "@/components/todo/todo";
import axios from "axios";
import {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await axios.get('/api');
    const todos = res.data.todos;
    setTodos([...todos]);
  };

  const deleteTodo = async (mongoID) => {
    const res = await axios.delete('/api', {params: {mongoId: mongoID}});
    await getTodos();
    toast.success(res.data.msg);
  };

  const completedTodo = async (mongoID) => {
    const res = await axios.put('/api', {}, {params: {mongoId: mongoID}});
    await getTodos();
    toast.success(res.data.msg);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setFormData({...formData, [name]: val});
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api', formData);
      await getTodos();
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(res.data.msg);
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input onChange={onchangeHandler} type="text" name="title" placeholder="Enter title" className="px-3 py-2 border-2 w-full" />
        <textarea onChange={onchangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full"></textarea>
        <button type="sumbit" className="bg-orange-600 py-3 px-11 text-white">Add Todo</button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, idx) => <Todo key={idx} content={todo} id={idx} deleteTodo={deleteTodo} completedTodo={completedTodo} />)}
          </tbody>
        </table>
      </div>

    </>
  );
}
