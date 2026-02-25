import { useState } from "react";
import { IonItem, IonInput, IonButton, IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";

// Props (Home): Funcion para agregar una tarea
function TaskForm({ onAddTask }: { onAddTask: (text: string) => void }) {
  const [taskText, setTaskText] = useState("");

  const handleAdd = () => {
    if (taskText.trim() === "") return;

    onAddTask(taskText.trim());

    setTaskText("");
  };

  return (
    <IonItem>
      <IonInput
        value={taskText}
        placeholder="Nueva tarea..."
        onIonInput={(e) => setTaskText(e.detail.value || "")}
      />
      <IonButton onClick={handleAdd}>
        <IonIcon icon={addCircleOutline} slot="start" />
        Agregar
      </IonButton>
    </IonItem>
  );
}

export default TaskForm;
