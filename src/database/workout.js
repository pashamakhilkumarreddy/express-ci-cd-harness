/* eslint-disable no-throw-literal */
import { readFileSync } from 'fs'
import find from 'lodash/find.js'
import path from 'path'
import { saveToDB } from './utils.js'

let DB

const loadDBJSON = () => {
  DB = JSON.parse(readFileSync(path.join(process.cwd(), '/src/database/db.json'), {
    encoding: 'utf-8'
  }))
}

loadDBJSON()

const getAllWorkouts = () => DB.workouts

const getWorkout = (workoutId) => {
  try {
    const workout = find(DB.workouts,
      (workout) => workout.id === workoutId
    )
    if (!workout) {
      throw ({
        status: 404,
        message: `Workout doesn't exist with the id ${workoutId}`
      })
    }
    return workout
  } catch (err) {
    throw new Error(err?.message || err)
  }
}

const createWorkout = (newWorkout) => {
  try {
    const workoutExists = !!DB.workouts.find(
      (workout) => workout.name === newWorkout.name
    )
    if (workoutExists) {
      throw ({
        status: 400,
        message: `Workout already exists with the name ${newWorkout.name}`
      })
    }
    const updatedWorkouts = DB.workouts.concat(newWorkout)
    DB.workouts = updatedWorkouts
    saveToDB(DB)
    loadDBJSON()
    return newWorkout
  } catch (err) {
    throw new Error(err?.message || err)
  }
}

const updateWorkout = (workoutId, workoutChanges) => {
  try {
    const workout = find(DB.workouts, (workout) => workout.id === workoutId)
    if (!workout) {
      throw ({
        status: 404,
        message: `No workout exists with the id ${workoutId}`
      })
    }
    const updatedWorkout = {
      ...workout,
      ...workoutChanges,
      updatedAt: new Date().toLocaleString('en-us', {
        timeZone: 'UTC'
      })
    }
    const updatedWorkouts = DB.workouts.map((workout) => {
      if (workout.id === workoutId) {
        return updatedWorkout
      }
      return workout
    })
    DB.workouts = updatedWorkouts
    saveToDB(DB)
    loadDBJSON()
    return updatedWorkout
  } catch (err) {
    throw new Error(err?.message || err)
  }
}

const deleteWorkout = (workoutId) => {
  try {
    const workout = find(DB.workouts, (workout) => workout.id === workoutId)
    if (!workout) {
      throw ({
        status: 404,
        message: `No workout exists with the id ${workoutId}`
      })
    }
    const updatedWorkouts = DB.workouts.filter((workout) => workout.id !== workoutId)
    DB.workouts = updatedWorkouts
    saveToDB(DB)
    loadDBJSON()
    return workout
  } catch (err) {
    throw new Error(err?.message || err)
  }
}

export {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
}
