import * as React from 'react';
import { RxCross2 } from 'react-icons/rx';

type TodoItemProps = {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  handleSortByDrag: React.DragEventHandler;
  handleClick: Function;
  handleDelete: Function;
  DragItem: any;
  DragOverItem: any;
};

export default function TodoItem({
  todo,
  handleSortByDrag,
  DragItem,
  DragOverItem,
  handleClick,
  handleDelete,
}: TodoItemProps) {
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
}
