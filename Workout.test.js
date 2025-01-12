import { Workout } from "./Workout.js";

test("The addToWorkout function can add an exercise to the workout", () => {
    const workout = new Workout();
    workout.addToWorkout("squats");
    expect(workout.exercises).toEqual(["squats"]);
});

test("The removeFromWorkout function can remove an exercise from the workout", () => {
    const workout = new Workout();
    workout.addToWorkout("squats");       
    workout.removeFromWorkout("squats");
    expect(workout.exercises).toEqual([]);
});
