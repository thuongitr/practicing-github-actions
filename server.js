import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

let workouts = new Map();

router.get("/workouts/:username/exercises", ctx => {
    const workout = workouts.get(ctx.params.username);
    workout ? (ctx.body = workout) : (ctx.status = 404);
});

router.post("/workouts/:username/exercises/:exercise", ctx => {
    const { username, exercise } = ctx.params;
    const newExercises = (workouts.get(username) || []).concat(exercise);
    workouts.set(username, newExercises);
    ctx.body = newExercises;
});

router.delete("/workouts/:username/exercises/:exercise", ctx => {
    const { username, exercise } = ctx.params;
    const newExercises = (workouts.get(username) || []).filter(i => i !== exercise);
    workouts.set(username, newExercises);
    ctx.body = newExercises;
});

app.use(router.routes());

const server = app.listen(3000);

const resetState = () => {
    workouts = new Map();
};

export {
    server,
    resetState
};
