'use client';
import TodoHeader from '@/components/TodoHeader';
import TodoItem from '@/components/TodoItem';
import fetchJson from '@/lib/fetchJson';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const modeOptions = [
  { value: 'All' },
  { value: 'Active' },
  { value: 'Completed' },
] as const;

type Mode = (typeof modeOptions)[number]['value'];

const todoSchema = z.object({
  title: z.string().nonempty(),
});

type TodoForm = z.infer<typeof todoSchema>;

type Todo = {
  id: number;
  title: string;
  is_completed: boolean;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
  });

  const [mode, setMode] = useState<Mode>('All');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodoAPI() {
      const todoDataApi = await fetchJson('http://localhost:3000/api/todos');
      return todoDataApi;
    }
    fetchTodoAPI().then((data) => {
      setTodos(data.items);
    });
  }, []);

  const myTodos = {
    All: todos,
    Active: todos.filter((todo) => !todo.is_completed),
    Completed: todos.filter((todo) => todo.is_completed),
  }[mode];

  const DragItem = useRef<number | null>(null);
  const DragOverItem = useRef<number | null>(null);
  const handleSortByDrag = () => {
    if (DragItem.current && DragOverItem.current) {
      const dragItemIndex = todos.findIndex(
        (todo) => todo.id === DragItem.current
      );
      const dragOverItemIndex = todos.findIndex(
        (todo) => todo.id === DragOverItem.current
      );
      const newTodos = [...todos];
      newTodos.splice(dragItemIndex, 1);
      newTodos.splice(dragOverItemIndex, 0, todos[dragItemIndex]);
      setTodos(newTodos);
    }
  };

  const handleClick = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.is_completed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      return newTodos;
    });
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => !todo.is_completed);
      return newTodos;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const onsubmit = (data: TodoForm) => {
    const todoExists = todos?.some((todo) => {
      return todo?.title?.toLowerCase() === data?.title?.toLowerCase();
    });
    if (todoExists) {
      toast.error('Todo already exists');
    }
    fetchJson('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: data.title }),
    });

    if (!todoExists) {
      const newTodo = {
        id: Date.now(),
        title: data.title,
        is_completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
    }
    reset();
  };

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeTodosLength = todos.filter((todo) => !todo.is_completed).length;

  return (
    <main className='relative h-screen justify-center p-5'>
      <TodoHeader />

      <div className='content mx-auto w-[500px]'>
        <form className='mx-10' onSubmit={handleSubmit(onsubmit)}>
          <input
            type='text'
            className='dark:-bg--clr-DarkTheme-VeryDarkDesaturatedBlue w-full rounded-md p-5 shadow-lg focus:border-none focus:outline-none'
            placeholder='Create a new todo...'
            autoComplete='off'
            {...register('title')}
          />
        </form>
        <div className='results dark:-bg--clr-DarkTheme-VeryDarkDesaturatedBlue bg-white shadow-lg'>
          {myTodos.map((todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                handleSortByDrag={handleSortByDrag}
                handleClick={handleClick}
                handleDelete={handleDelete}
                DragItem={DragItem}
                DragOverItem={DragOverItem}
              ></TodoItem>
            );
          })}
          {todos.length > 0 && (
            <div className='dark:-text--clr-DarkTheme-VeryDarkGrayishBlue flex w-full items-center justify-between gap-5 p-5 text-xs'>
              <div>{activeTodosLength} items left</div>
              <ul className='hidden items-center gap-4 md:flex '>
                {modeOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`cursor-pointer ${
                      mode === option.value
                        ? 'font-bold text-blue-500'
                        : 'hover:font-bold hover:text-black dark:hover:text-white'
                    }`}
                    onClick={() => setMode(option.value)}
                  >
                    {option.value}
                  </li>
                ))}
              </ul>
              <div
                onClick={handleClearCompleted}
                className='cursor-pointer hover:text-black dark:hover:text-white'
              >
                Clear Completed
              </div>
            </div>
          )}
        </div>
        <div className='dark:-bg--clr-DarkTheme-VeryDarkDesaturatedBlue mt-8 flex justify-center rounded-md bg-white px-8 py-5 shadow-lg md:hidden'>
          <ul className='flex items-center justify-center gap-4'>
            {modeOptions.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer text-xs ${
                  mode === option.value
                    ? 'font-bold text-blue-500'
                    : 'hover:font-bold hover:text-black dark:hover:text-white'
                }`}
                onClick={() => setMode(option.value)}
              >
                {option.value}
              </li>
            ))}
          </ul>
        </div>
        <div className='-text--clr-LightTheme-DarkGrayishBlue dark:-text--clr-DarkTheme-VeryDarkGrayishBlue mt-7 hidden text-center text-sm md:block'>
          Drag and drop to reorder list
        </div>
      </div>
    </main>
  );
}
