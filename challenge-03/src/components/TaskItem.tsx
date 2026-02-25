import { IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline, checkmarkCircle, trashOutline } from 'ionicons/icons';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Props: la tarea, y las funciones del padre para toggle y delete
function TaskItem({ task, onToggle, onDelete }: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <IonItem>
      <IonButton
        fill="clear"
        slot="start"
        onClick={() => onToggle(task.id)}
      >
        <IonIcon
          icon={task.completed ? checkmarkCircle : checkmarkCircleOutline}
          color={task.completed ? 'success' : 'medium'}
        />
      </IonButton>

      <IonLabel
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'gray' : 'inherit',
        }}
      >
        {task.text}
      </IonLabel>

      <IonButton
        fill="clear"
        slot="end"
        color="danger"
        onClick={() => onDelete(task.id)}
      >
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
}

export default TaskItem;