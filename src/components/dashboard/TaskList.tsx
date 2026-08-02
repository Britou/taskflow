import { useState } from "react";
import { Plus } from "lucide-react";

import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { TaskItem } from "./TaskItem";
import { useTasks } from "../../hooks/useTasks";
import { SectionHeader } from "../common/SectionHeader";
import { createTask } from "../../services/taskService";

export function TaskList() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [saving, setSaving] = useState(false);
  const { tasks, loading, reload } = useTasks();
  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const trimmedTitle = taskTitle.trim();

  if (!trimmedTitle || saving) {
    return;
  }

  try {
    setSaving(true);

    await createTask({
      title: trimmedTitle,
      completed: false,
      priority: taskPriority as "low" | "medium" | "high",
    });

    setTaskTitle("");
    setTaskPriority("medium");
    setCreateModalOpen(false);
    reload();
  } finally {
    setSaving(false);
  }
}

  return (
    <Card>
      <div className="space-y-5">
        <SectionHeader
          title="PrÃ³ximas tarefas"
          description="Acompanhe as atividades em andamento."
          action={
            <Button className="h-10 px-4" onClick={() => setCreateModalOpen(true)}>
              <Plus size={16} />
              Nova tarefa
          </Button>
          }
        />

        {loading ? (
          <p className="text-sm text-slate-500">
            Carregando tarefas...
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                completed={task.completed}
              />
            ))}
          </div>
        )}
      </div>
      
      <Modal
        open={createModalOpen}
        title="Nova tarefa"
        description="Aqui vamos criar o formulario de cadastro da tarefa."
        onClose={() => setCreateModalOpen(false)}
      >
        <form onSubmit={handleCreateTask} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="task-title"
              className="text-sm font-medium text-slate-700"
            >
              Titulo
            </label>

            <input
              id="task-title"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Ex: Criar formulario de login"
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="task-priority"
              className="text-sm font-medium text-slate-700"
            >
              Prioridade
            </label>

            <select
              id="task-priority"
              value={taskPriority}
              onChange={(event) => setTaskPriority(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="low">Baixa</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setCreateModalOpen(false)}disabled={saving}>
              Cancelar
            </Button>

            <Button type="submit" disabled={saving || !taskTitle.trim()}>
              {saving ? "Salvando..." : "Salvar tarefa"}
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
