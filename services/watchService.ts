import { Store } from "@reduxjs/toolkit";
import WatchConnectivity from "react-native-watch-connectivity";

import { WatchMessage, WatchMessageType, WatchReply } from "../models/watch";
import {
  addExerciseSet,
  addRessenti,
  addWorkoutInformation,
  resetCurrentWorkout,
} from "../reducers/currentWorkout";
import { Performance, Workout, WorkoutExercise } from "../shared/types";
import { RootState } from "../store";

// ─────────────────────────────────────────────────────────────
// Handler type
// ─────────────────────────────────────────────────────────────

type MessageHandler = (
  payload: Record<string, unknown>,
  store: Store,
) => Promise<WatchReply>;

// ─────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────

const getState = (store: Store): RootState => store.getState() as RootState;

// ─────────────────────────────────────────────────────────────
// Screen 1 — HomeScreen
// La Watch vérifie juste que l'app tourne et répond.
// ─────────────────────────────────────────────────────────────

const handleCheckConnection: MessageHandler = async () => {
  return { success: true, data: { connected: true } };
};

// ─────────────────────────────────────────────────────────────
// Screen 2 — Liste des séances
// Retourne la liste { id, name } + flag si une séance est en cours.
// ─────────────────────────────────────────────────────────────

const handleGetSessions: MessageHandler = async (_payload, store) => {
  const state = getState(store);

  return {
    success: true,
    data: {
      sessions: state.workouts.value.map((w: Workout) => ({
        id: w._id,
        name: w.name,
        image: w.image,
        exerciseCount: w.exercises.length,
      })),
    },
  };
};

const handleGetActiveRecording: MessageHandler = async (_payload, store) => {
  const state = getState(store);
  const current = state.currentWorkout.value;
  const isActive = current.workout !== null;

  return {
    success: true,
    data: {
      isActive,
      activeWorkoutId: isActive ? current.workout : null,
    },
  };
};

// ─────────────────────────────────────────────────────────────
// Screen 3 — Détail de la séance
// Init : liste des exercices mise en cache côté Watch.
// ─────────────────────────────────────────────────────────────

const handleGetSessionExercises: MessageHandler = async (payload, store) => {
  const { sessionId } = payload as { sessionId: string };
  const state = getState(store);

  const workout = state.workouts.value.find(
    (w: Workout) => w._id === sessionId,
  );
  if (!workout) {
    return { success: false, error: `Session ${sessionId} introuvable` };
  }

  return {
    success: true,
    data: {
      sessionId: workout._id,
      sessionName: workout.name,
      exercises: workout.exercises.map((e: WorkoutExercise) => ({
        id: e.exercise._id,
        name: e.exercise.name,
        muscleGroup: e.exercise.muscleGroupe,
        image: e.exercise.image ?? null,
        targetSets: e.customSets.length,
        customSets: e.customSets, // [{weight, reps}] — objectifs prévus
        restSeconds: e.rest,
      })),
    },
  };
};

// ─────────────────────────────────────────────────────────────
// Screen 3 — Démarrage d'une séance
// ─────────────────────────────────────────────────────────────

const handleCheckRecordingInProgress: MessageHandler = async (
  _payload,
  store,
) => {
  const state = getState(store);
  return {
    success: true,
    data: { isInProgress: state.currentWorkout.value.workout !== null },
  };
};

const handleStartSessionRecording: MessageHandler = async (payload, store) => {
  const { sessionId } = payload as { sessionId: string };
  const state = getState(store);

  if (state.currentWorkout.value.workout !== null) {
    return {
      success: false,
      error: "Une séance est déjà en cours",
      data: { activeWorkoutId: state.currentWorkout.value.workout },
    };
  }

  const userToken = state.user.value?.token;
  if (!userToken) {
    return { success: false, error: "Utilisateur non authentifié" };
  }

  const workout = state.workouts.value.find(
    (w: Workout) => w._id === sessionId,
  );
  if (!workout) {
    return { success: false, error: `Session ${sessionId} introuvable` };
  }

  store.dispatch(addWorkoutInformation({ userToken, workoutID: sessionId }));

  return {
    success: true,
    data: { started: true, sessionId, sessionName: workout.name },
  };
};

// ─────────────────────────────────────────────────────────────
// Screen 4 — Détail de l'exercice
// Infos complètes + nombre de séries déjà enregistrées.
// ─────────────────────────────────────────────────────────────

const handleGetExerciseDetails: MessageHandler = async (payload, store) => {
  const { exerciseId, sessionId } = payload as {
    exerciseId: string;
    sessionId: string;
  };
  const state = getState(store);

  const workout = state.workouts.value.find(
    (w: Workout) => w._id === sessionId,
  );
  if (!workout) {
    return { success: false, error: `Session ${sessionId} introuvable` };
  }

  const workoutExercise = workout.exercises.find(
    (e: WorkoutExercise) => e.exercise._id === exerciseId,
  );
  if (!workoutExercise) {
    return { success: false, error: `Exercice ${exerciseId} introuvable` };
  }

  const performance = state.currentWorkout.value.performances.find(
    (p: Performance) => p.exercise === exerciseId,
  );

  return {
    success: true,
    data: {
      exercise: {
        id: workoutExercise.exercise._id,
        name: workoutExercise.exercise.name,
        muscleGroup: workoutExercise.exercise.muscleGroupe,
        description: workoutExercise.exercise.description ?? null,
        image: workoutExercise.exercise.image ?? null,
        customSets: workoutExercise.customSets,
        targetSets: workoutExercise.customSets.length,
        restSeconds: workoutExercise.rest,
      },
      completedSetsCount: performance?.sets.length ?? 0,
    },
  };
};

const handleGetExerciseSetsCount: MessageHandler = async (payload, store) => {
  const { exerciseId } = payload as { exerciseId: string };
  const state = getState(store);

  const performance = state.currentWorkout.value.performances.find(
    (p: Performance) => p.exercise === exerciseId,
  );

  return {
    success: true,
    data: { completedSetsCount: performance?.sets.length ?? 0 },
  };
};

// ─────────────────────────────────────────────────────────────
// Screen 6 — Fin du timer
// Dispatch addExerciseSet puis retourne si toutes les séries sont faites.
// allSetsCompleted: true  → Watch navigue vers liste exercices
// allSetsCompleted: false → Watch reste sur le détail de l'exercice
// ─────────────────────────────────────────────────────────────

const handleSaveSet: MessageHandler = async (payload, store) => {
  const { exerciseId, sessionId, weight, reps, rest } = payload as {
    exerciseId: string;
    sessionId: string;
    weight: number;
    reps: number;
    rest: number;
  };

  const state = getState(store);

  const workout = state.workouts.value.find(
    (w: Workout) => w._id === sessionId,
  );
  if (!workout) {
    return { success: false, error: `Session ${sessionId} introuvable` };
  }

  const workoutExercise = workout.exercises.find(
    (e: WorkoutExercise) => e.exercise._id === exerciseId,
  );
  if (!workoutExercise) {
    return { success: false, error: `Exercice ${exerciseId} introuvable` };
  }

  store.dispatch(
    addExerciseSet({ exerciseID: exerciseId, weight, reps, rest }),
  );

  const updatedPerformance = getState(
    store,
  ).currentWorkout.value.performances.find(
    (p: Performance) => p.exercise === exerciseId,
  );
  const completedSetsCount = updatedPerformance?.sets.length ?? 0;
  const targetSets = workoutExercise.customSets.length;

  return {
    success: true,
    data: {
      completedSetsCount,
      targetSets,
      allSetsCompleted: completedSetsCount >= targetSets,
    },
  };
};

// ─────────────────────────────────────────────────────────────
// Screen 7 — Fin de séance
// Enregistre la note, envoie au back, reset reducer.
// ─────────────────────────────────────────────────────────────

const handleFinishSession: MessageHandler = async (payload, store) => {
  const { note, ressenti } = payload as { note: number; ressenti: string };
  const state = getState(store);
  const current = state.currentWorkout.value;

  if (!current.workout) {
    return { success: false, error: "Aucune séance en cours" };
  }

  store.dispatch(addRessenti({ note, ressenti }));

  const finalCurrent = getState(store).currentWorkout.value;

  try {
    const backendUrl = process.env.EXPO_PUBLIC_API_URL;
    await fetch(`${backendUrl}/workouts/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: finalCurrent.user,
        workout: finalCurrent.workout,
        date: finalCurrent.date,
        performances: finalCurrent.performances,
        note: finalCurrent.note,
        ressenti: finalCurrent.ressenti,
      }),
    });
  } catch (err) {
    // Reset quand même pour ne pas bloquer la Watch
    console.error("[WatchService] Échec envoi historique au back :", err);
  }

  store.dispatch(resetCurrentWorkout());

  return { success: true, data: { finished: true } };
};

// ─────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────

const HANDLERS: Record<WatchMessageType, MessageHandler> = {
  CHECK_CONNECTION: handleCheckConnection,
  GET_SESSIONS: handleGetSessions,
  GET_ACTIVE_RECORDING: handleGetActiveRecording,
  GET_SESSION_EXERCISES: handleGetSessionExercises,
  CHECK_RECORDING_IN_PROGRESS: handleCheckRecordingInProgress,
  START_SESSION_RECORDING: handleStartSessionRecording,
  GET_EXERCISE_DETAILS: handleGetExerciseDetails,
  GET_EXERCISE_SETS_COUNT: handleGetExerciseSetsCount,
  SAVE_SET: handleSaveSet,
  FINISH_SESSION: handleFinishSession,
};

// ─────────────────────────────────────────────────────────────
// WatchService — singleton
// ─────────────────────────────────────────────────────────────

class WatchService {
  private store: Store | null = null;
  private unsubscribe: (() => void) | null = null;

  /**
   * À appeler une seule fois dans App.tsx après le Provider Redux.
   *
   * watchService.init(store)
   */
  init(store: Store): void {
    if (this.unsubscribe) {
      console.warn("[WatchService] Déjà initialisé");
      return;
    }
    this.store = store;
    this.unsubscribe = WatchConnectivity.watchEvents.addListener<
      WatchMessage,
      WatchReply
    >("message", this.handleMessage);
    console.log("[WatchService] En écoute des messages Watch");
  }

  destroy(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
    this.store = null;
  }

  private handleMessage = async (
    message: WatchMessage,
    reply: ((response: WatchReply) => void) | null,
  ): Promise<void> => {
    const { type, payload = {} } = message;

    if (!reply) {
      console.warn("[WatchService] Message reçu sans reply handler, ignoré");
      return;
    }

    if (!this.store) {
      reply({ success: false, error: "Store non initialisé" });
      return;
    }

    const handler = HANDLERS[type];
    if (!handler) {
      console.warn(`[WatchService] Type inconnu : ${type}`);
      reply({ success: false, error: `Type inconnu : ${type}` });
      return;
    }

    try {
      console.log(`[WatchService] → ${type}`, payload);
      const response = await handler(payload, this.store);
      console.log(`[WatchService] ← ${type}`, response);
      reply(response);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      console.error(`[WatchService] Erreur sur ${type} :`, err);
      reply({ success: false, error: msg });
    }
  };
}

export const watchService = new WatchService();
