import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  deleteField,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Task } from "../types/task";

const TASKS_COLLECTION = "tasks";

export async function getTasks(): Promise<Task[]> {
  const snapshot = await getDocs(collection(db, TASKS_COLLECTION));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Task, "id">),
  }));
}

export async function createTask(
  task: Omit<Task, "id">
): Promise<void> {
  await addDoc(collection(db, TASKS_COLLECTION), {
    ...task,
    createdAt: Date.now(),
  });
}

export async function updateTask(
  id: string,
  task: Partial<Omit<Task, "id">>
): Promise<void> {
  const taskData = {
    ...task,
    dueDate:
      "dueDate" in task && task.dueDate === undefined
        ? deleteField()
        : task.dueDate,
  };

  await updateDoc(doc(db, TASKS_COLLECTION, id), taskData);
}

export async function deleteTask(
  id: string
): Promise<void> {
  await deleteDoc(doc(db, TASKS_COLLECTION, id));
}
