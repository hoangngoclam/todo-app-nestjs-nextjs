'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsSun, BsMoon } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { z } from 'zod';

const modeOptions = [
  { value: 'All' },
  { value: 'Active' },
  { value: 'Completed' },
] as const;

type Mode = (typeof modeOptions)[number]['value'];

const todoSchema = z.object({
  text: z.string().nonempty(),
});

type TodoForm = z.infer<typeof todoSchema>;

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
  });
  const { theme, systemTheme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [mode, setMode] = useState<Mode>('All');
  const [todos, setTodos] = useState<Todo[]>([]);

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
          return { ...todo, completed: !todo.completed };
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
      const newTodos = prevTodos.filter((todo) => !todo.completed);
      return newTodos;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const onsubmit = (data: TodoForm) => {
    const todoExists = todos?.some((todo) => {
      return todo?.text?.toLowerCase() === data?.text?.toLowerCase();
    });
    if (todoExists) {
      toast.error('Todo already exists');
    }
    if (!todoExists) {
      const newTodo = { id: Date.now(), text: data.text, completed: false };
      setTodos((prev) => [...prev, newTodo]);
    }
    reset();
  };

  const myTodos = {
    All: todos,
    Active: todos.filter((todo) => !todo.completed),
    Completed: todos.filter((todo) => todo.completed),
  }[mode];

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const activeTodosLength = todos.filter((todo) => !todo.completed).length;

  return (
    <main className='relative flex h-screen justify-center p-5'>
      <div className='content mt-32 w-[500px]'>
        <div className='text mb-10 flex items-center justify-between text-white'>
          <h1 className='text-4xl font-bold tracking-widest '>TODO</h1>
          <div
            className='mode cursor-pointer'
            onClick={() =>
              theme == 'dark' ? setTheme('light') : setTheme('dark')
            }
          >
            {currentTheme === 'light' ? (
              <BsMoon size={30} />
            ) : (
              <BsSun size={30} />
            )}
          </div>
        </div>
        <form className='mb-10' onSubmit={handleSubmit(onsubmit)}>
          <input
            type='text'
            className='dark:-bg--clr-DarkTheme-VeryDarkDesaturatedBlue w-full rounded-md p-5 shadow-lg focus:border-none focus:outline-none'
            placeholder='Create a new todo...'
            autoComplete='off'
            {...register('text')}
          />
        </form>
        <div className='results dark:-bg--clr-DarkTheme-VeryDarkDesaturatedBlue bg-white shadow-lg'>
          {myTodos.map((todo) => {
            return (
              <label
                htmlFor={`todo${todo.id}`}
                draggable='true'
                onDragStart={() => (DragItem.current = todo.id)}
                onDragEnter={() => (DragOverItem.current = todo.id)}
                onDragEnd={handleSortByDrag}
                className='text dark:-border--clr-DarkTheme-VeryDarkGrayishBlue group relative flex w-full cursor-pointer items-center gap-5 border-b px-8 py-5 capitalize focus:border-none focus:outline-none '
                key={todo.id}
              >
                <input
                  type='checkbox'
                  name={todo.text}
                  id={`todo${todo.id}`}
                  value={todo.text}
                  defaultChecked={todo.completed}
                  className='todoCheckBox linearGradientCustom peer'
                  onClick={() => handleClick(todo?.id)}
                />
                <span className='circle peer-checked:linearGradientCustom -ring--clr-LightTheme-LightGrayishBlue dark:-ring--clr-DarkTheme-DarkGrayishBlue/30 ring-1 group-hover:ring-[#d582ee] peer-checked:ring-0' />
                <div className='text -text--clr-LightTheme-VeryDarkGrayishBlue dark:-text--clr-DarkTheme-LightGrayishBlue peer-checked:-text--clr-LightTheme-DarkGrayishBlue dark:peer-checked:-text--clr-LightTheme-DarkGrayishBlue peer-checked:line-through'>
                  {todo.text}
                </div>
                <RxCross2
                  className='absolute right-5 top-1/2 block -translate-y-1/2 group-hover:block md:hidden'
                  onClick={() => handleDelete(todo.id)}
                />
              </label>
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

      <Image
        src={`/images/${
          currentTheme === 'light' ? 'bg-desktop-light' : 'bg-desktop-dark'
        }.jpg`}
        className='absolute left-0 top-0 -z-10 h-2/5 w-full select-none object-cover'
        width={1440}
        height={300}
        alt='TopImage'
      />
      <div
        className={`absolute bottom-0 left-0 -z-10 h-3/5 w-full bg-white transition-colors duration-300 dark:bg-[#181824]`}
      />
    </main>
  );
}
