import { server, resetState } from './server';
import fetch from 'isomorphic-fetch';

const apiRoot = "http://localhost:3000";

const addExercise = (username, exercise) => {
  return fetch(`${apiRoot}/workouts/${username}/exercises/${exercise}`, {
    method: "POST"
  });
};

const removeExercise = (username, exercise) => {
  return fetch(`${apiRoot}/workouts/${username}/exercises/${exercise}`, {
    method: "DELETE"
  });
};

const getExercises = username => {
  return fetch(`${apiRoot}/workouts/${username}/exercises`, { method: "GET" });
};

test("adding exercises to a workout", async () => {

  const initialExercisesResponse = await getExercises("Heimo");
  expect(initialExercisesResponse.status).toBe(404);

  const addExerciseResponse = await addExercise("Heimo", "squats");
  expect(await addExerciseResponse.json()).toEqual(["squats"]);

  const finalExercisesResponse = await getExercises("Heimo");
  expect(await finalExercisesResponse.json()).toEqual(["squats"]);

});

test("removing exercises from a workout", async () => {
  const initialExercisesResponse = await getExercises("Heimo");
  expect(initialExercisesResponse.status).toBe(404);

  await addExercise("Heimo", "squats");

  const removeExercisesResponse = await removeExercise("Heimo", "squats");
  expect(await removeExercisesResponse.json()).toEqual([]);

  const finalExercisesResponse = await getExercises("Heimo");
  expect(await finalExercisesResponse.json()).toEqual([]);
});

beforeEach(() => resetState());
afterAll(() => server.close());
