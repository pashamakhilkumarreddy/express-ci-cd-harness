import RecordDB from '../database/index.js'

/* eslint-disable no-useless-catch */

const getRecordForWorkout = (workoutId) => {
  try {
    const record = RecordDB.getRecordForWorkout(workoutId)
    return record
  } catch (err) {
    throw err
  }
}

export {
  getRecordForWorkout
}
