import { useMutation, useQuery } from "react-query";
import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  function fetchTodo() {
    return todos;
  }

  const { data, isLoading, error, refetch } = useQuery({queryKey:"todos", queryFn:fetchTodo});

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      refetch();
    },
  });
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      refetch();
    },
  });
  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      refetch();
    },
  });

  async function addTodo(todo: string) {
    setTodos([...todos, todo]);
  }

  async function deleteTodo(index: number) {
    todos.splice(index,1)
    setTodos(todos);
  }

  async function editTodo(params: { index: number, updateTodo: string }) {
    const updatedTodos = [...todos];
    updatedTodos[params.index] = params.updateTodo;
    setTodos(updatedTodos);
  }

  const handleAddTodo = () => {
    if (newTodo == "") {
      alert("Enter some data");
    } else {
      addTodoMutation.mutate(newTodo);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index: number) => {
    deleteTodoMutation.mutate(index);
  };

  const handleUpdateTodo = (index: number) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };

  const handleSaveChanges = () => {
    if (editIndex !== null) {
      editTodoMutation.mutate({ index: editIndex, updateTodo: newTodo });
      setEditIndex(null);
      setNewTodo("");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {editIndex !== null ? (
        <button onClick={handleSaveChanges}>Save Change</button>
      ) : (
        <button onClick={handleAddTodo}>Add Todo</button>
      )}
      <div>
        {data?.map((todo, index) => (
          <div key={index}>
            <li>{todo}</li>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            <button onClick={() => handleUpdateTodo(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
