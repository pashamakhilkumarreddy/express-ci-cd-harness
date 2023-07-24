import { nanoid } from 'nanoid'
import WorkoutDB from '../database/index.js'

/* eslint-disable no-useless-catch */

const getAllWorkouts = (filterParams) => {
  try {
    const allWorkouts = WorkoutDB.getAllWorkouts(filterParams)
    return allWorkouts
  } catch (err) {
    throw err
  }
}

const getWorkout = (workoutId) => {
  try {
    const workout = WorkoutDB.getWorkout(workoutId)
    return workout
  } catch (err) {
    throw err
  }
}

const createWorkout = (newWorkout) => {
  try {
    const workoutToInsert = {
      id: nanoid(),
      ...newWorkout,
      createdAt: new Date().toLocaleString('en-US', {
        timeZone: 'UTC'
      }),
      updatedAt: new Date().toLocaleString('en-US', {
        timeZone: 'UTC'
      })
    }
    const createdWorkout = WorkoutDB.createWorkout(workoutToInsert)
    return createdWorkout
  } catch (err) {
    throw err
  }
}

const updateWorkout = (workoutId, updatedWorkoutPayload) => {
  try {
    const updatedWorkout = WorkoutDB.updateWorkout(workoutId, updatedWorkoutPayload)
    return updatedWorkout
  } catch (err) {
    throw err
  }
}

const deleteWorkout = (workoutId) => {
  try {
    const deletedWorkout = WorkoutDB.deleteWorkout(workoutId)
    return deletedWorkout
  } catch (err) {
    throw err
  }
}

export {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
}
