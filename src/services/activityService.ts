import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";
import type { Activity } from "../types/activity";

const activitiesCollection = collection(db, "activities");

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (differenceInSeconds < 60) {
    return "Agora";
  }

  const differenceInMinutes = Math.floor(
    differenceInSeconds / 60
  );

  if (differenceInMinutes < 60) {
    return differenceInMinutes === 1
      ? "Há 1 minuto"
      : `Há ${differenceInMinutes} minutos`;
  }

  const differenceInHours = Math.floor(
    differenceInMinutes / 60
  );

  if (differenceInHours < 24) {
    return differenceInHours === 1
      ? "Há 1 hora"
      : `Há ${differenceInHours} horas`;
  }

  const differenceInDays = Math.floor(
    differenceInHours / 24
  );

  if (differenceInDays === 1) {
    return "Ontem";
  }

  return `Há ${differenceInDays} dias`;
}

export async function createActivity(title: string, userId: string) {
  await addDoc(activitiesCollection, {
    title,
    userId,
    createdAt: serverTimestamp(),
  });
}

export async function getActivities(userId: string): Promise<Activity[]> {
  const activitiesQuery = query(
    activitiesCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(activitiesQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    const createdAt = data.createdAt?.toDate
      ? data.createdAt.toDate()
      : new Date();

    return {
      id: doc.id,
      title: data.title,
      time: formatRelativeTime(createdAt),
      userId: data.userId,
    };
  });
}