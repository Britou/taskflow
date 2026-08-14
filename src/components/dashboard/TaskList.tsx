import { useState } from "react";
import { Plus } from "lucide-react";

import type { Task } from "../../types/task";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { TaskItem } from "./TaskItem";
import { useTasks } from "../../hooks/useTasks";
import { useActivityContext } from "../../contexts/ActivityContext";
import { SectionHeader } from "../common/SectionHeader";
import { createTask, deleteTask, updateTask, } from "../../services/taskService";

export function TaskList() {
  const [sortOption, setSortOption] = useState("default");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [saving, setSaving] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { tasks, loading, reload } = useTasks();
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    return matchesSearch && matchesPriority && matchesStatus;
  });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "created-newest") {
      return (b.createdAt ?? 0) - (a.createdAt ?? 0);
    }

    if (sortOption === "created-oldest") {
      return (a.createdAt ?? 0) - (b.createdAt ?? 0);
    }

    if (sortOption === "priority-high") {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    if (sortOption === "priority-low") {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    }

    if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  const { addActivity } = useActivityContext();
  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const trimmedTitle = taskTitle.trim();

  if (!trimmedTitle || saving) {
    return;
  }

  try {
    setSaving(true);

    if (editingTask) {
    await updateTask(editingTask.id, {
      title: trimmedTitle,
      priority: taskPriority as "low" | "medium" | "high",
    });

    addActivity(`Você editou a tarefa "${trimmedTitle}".`);
  } else {
    await createTask({
      title: trimmedTitle,
      completed: false,
      priority: taskPriority as "low" | "medium" | "high",
    });

    addActivity(`Você criou a tarefa "${trimmedTitle}".`);
  }

    setTaskTitle("");
    setTaskPriority("medium");
    setEditingTask(null);
    setCreateModalOpen(false);
    reload();
  } finally {
    setSaving(false);
  }
}

  function handleStartEditTask(task: Task) {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskPriority(task.priority);
    setCreateModalOpen(true);
}

  async function handleDeleteTask(id: string) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmed) {
      return;
    }

    const task = tasks.find((item) => item.id === id);

    await deleteTask(id);

    if (task) {
      addActivity(`Você excluiu a tarefa "${task.title}".`);
    }

    reload();
  }

  async function handleToggleTask(task: Task) {
    const completed = !task.completed;

    await updateTask(task.id, {
      completed,
    });

    if (completed) {
      addActivity(`Você concluiu a tarefa "${task.title}".`);
    } else {
      addActivity(`Você reabriu a tarefa "${task.title}".`);
    }

    reload();
  }

  return (
    <Card>
      <div className="space-y-5">
        <SectionHeader
          title="Proximas tarefas"
          description="Acompanhe as atividades em andamento."
          action={
            <Button className="h-10 px-4" onClick={() => setCreateModalOpen(true)}>
              <Plus size={16} />
              Nova tarefa
          </Button>
          }
        />
        <div className="mb-6 space-y-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Pesquisar tarefas..."
            className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">Todas as prioridades</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="all">Todas as tarefas</option>
              <option value="pending">Pendentes</option>
              <option value="completed">Concluídas</option>
            </select>

            <Button
              type="button"
              variant="secondary"
              className="sm:col-span-2"
              onClick={() => {
                setSearchTerm("");
                setPriorityFilter("all");
                setStatusFilter("all");
                setSortOption("default");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        </div>
        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="default">Ordem padrão</option>
          <option value="created-newest">Mais recentes</option>
          <option value="created-oldest">Mais antigas</option>
          <option value="priority-high">Maior prioridade</option>
          <option value="priority-low">Menor prioridade</option>
          <option value="title-asc">Título: A → Z</option>
          <option value="title-desc">Título: Z → A</option>
        </select>

        {loading ? (
          <p className="text-sm text-slate-500">
            Carregando tarefas...
          </p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nenhuma tarefa encontrada.
          </p>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                completed={task.completed}
                priority={task.priority}
                onDelete={() => handleDeleteTask(task.id)}
                onEdit={() => handleStartEditTask(task)}
                onToggleComplete={() => handleToggleTask(task)}
              />
            ))}
          </div>
        )}
      </div>
      
      <Modal
        open={createModalOpen}
        title={editingTask ? "Editar tarefa" : "Nova tarefa"}
        description={
          editingTask
            ? "Atualize as informacoes da tarefa."
            : "Aqui vamos criar o formulario de cadastro da tarefa."
        }
        onClose={() => {
          setCreateModalOpen(false);
          setEditingTask(null);
          setTaskTitle("");
          setTaskPriority("medium");
        }}
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
              {saving ? "Salvando..." : editingTask ? "Salvar alteracoes" : "Salvar tarefa"}
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
