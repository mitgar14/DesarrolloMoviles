import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLoading,
} from '@ionic/react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks([
        { id: 1, text: 'Revisar apuntes de Ionic', completed: false },
        { id: 2, text: 'Instalar Ionic CLI', completed: true },
        { id: 3, text: 'Crear proyecto con ionic start', completed: false },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Funcion para agregar una tarea nueva
  // Prop del componente hijo TaskForm
  const addTask = (text: string) => {

    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);

  };

  // Funcion para marcar o desmarcar una tarea como completada
  // Prop del componente hijo TaskItem
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Funcion para eliminar una tarea
  // Prop del componente hijo TaskItem
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Task Manager</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Cargando tareas..." />

        <TaskForm onAddTask={addTask} />

        <IonList>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
