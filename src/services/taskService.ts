import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  deleteField,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Task } from "../types/task";

const TASKS_COLLECTION = "tasks";

export async function getTasks(userId: string): Promise<Task[]> {
  const tasksQuery = query(
    collection(db, TASKS_COLLECTION),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Task, "id">),
  }));
}

function removeUndefinedFields(data: Record<string, unknown>) {
  const cleanedData = { ...data };

  Object.keys(cleanedData).forEach((key) => {
    if (cleanedData[key] === undefined) {
      delete cleanedData[key];
    }
  });

  return cleanedData;
}

export async function createTask(
  task: Omit<Task, "id" | "userId">,
  userId: string
): Promise<void> {
  await addDoc(
    collection(db, TASKS_COLLECTION),
    removeUndefinedFields({
      ...task,
      userId,
      createdAt: Date.now(),
    })
  );
}

export async function updateTask(
  id: string,
  task: Partial<Omit<Task, "id">>
): Promise<void> {
  const taskData: Record<string, unknown> = removeUndefinedFields(task);

  if ("dueDate" in task && task.dueDate === undefined) {
    taskData.dueDate = deleteField();
  }

  if ("description" in task && task.description === undefined) {
    taskData.description = deleteField();
  }

  await updateDoc(doc(db, TASKS_COLLECTION, id), taskData);
}

export async function deleteTask(
  id: string
): Promise<void> {
  await deleteDoc(doc(db, TASKS_COLLECTION, id));
}
