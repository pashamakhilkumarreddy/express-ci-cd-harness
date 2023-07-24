import services from '../services/index.js'

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllWorkouts = (req, res) => {
  try {
    const { mode, length, page = 1, limit = 10, sort = 'createdAt' } = req.query
    const workouts = services.getAllWorkouts({ mode, length, page, limit, sort })
    return res.status(200).send({
      error: false,
      data: workouts,
      messages: [
        'Successfully fetched all workouts'
      ]
    })
  } catch (err) {
    console.error(err)
    const status = err?.status || 500
    const msg = err?.message || 'Internal server error'
    return res.status(status).send({
      error: true,
      data: null,
      messages: [
        msg
      ]
    })
  }
}

const getWorkout = (req, res) => {
  try {
    const { workoutId } = req.params
    if (!workoutId) {
      return res.status(400).send({
        error: true,
        data: null,
        messages: [
          'WorkoutId is required to fetch the necessary workout'
        ]
      })
    }
    const workout = services.getWorkout(workoutId)
    return res.status(200).send({
      error: false,
      data: workout,
      messages: [
        `Successfully fetched workout with id ${workoutId}`
      ]
    })
  } catch (err) {
    console.error(err)
    const status = err?.status || 500
    const msg = err?.message || 'Internal server error'
    return res.status(status).send({
      error: true,
      data: null,
      messages: [
        msg
      ]
    })
  }
}

const createWorkout = (req, res) => {
  try {
    const { name, mode, equipment = [], exercises = [], trainerTips = [] } = req.body
    if (
      !name ||
      !mode ||
      !equipment ||
      !exercises ||
      !trainerTips
    ) {
      return res.status(400).send({
        error: true,
        data: null,
        messages: [
          'name or mode or equipment or exercises or trainerTips is either missing or empty in the request body'
        ]
      })
    }
    const newWorkout = {
      name,
      mode,
      equipment,
      exercises,
      trainerTips
    }
    const createdWorkout = services.createWorkout(newWorkout)
    return res.status(201).send({
      error: false,
      data: createdWorkout,
      messages: [
        `Successfully created a new workout with id ${createdWorkout.id}`
      ]
    })
  } catch (err) {
    console.error(err)
    const status = err?.status || 500
    const msg = err?.message || 'Internal server error'
    return res.status(status).send({
      error: true,
      data: null,
      messages: [
        msg
      ]
    })
  }
}

const updateWorkout = (req, res) => {
  try {
    const { workoutId } = req.params
    if (!workoutId) {
      return res.status(400).send({
        error: true,
        data: null,
        messages: [
          'WorkoutId is required to update the workout'
        ]
      })
    }
    const workoutPayload = req.body
    const updatedWorkout = services.updateWorkout(workoutId, workoutPayload)
    return res.status(200).send({
      error: false,
      data: updatedWorkout,
      messages: [
        `Successfully updated workout with id ${workoutId}`
      ]
    })
  } catch (err) {
    console.error(err)
    const status = err?.status || 500
    const msg = err?.message || 'Internal server error'
    return res.status(status).send({
      error: true,
      data: null,
      messages: [
        msg
      ]
    })
  }
}

const deleteWorkout = (req, res) => {
  try {
    const { workoutId } = req.params
    if (!workoutId) {
      return res.status(400).send({
        error: true,
        data: null,
        messages: [
          'WorkoutId is necessary to delete the required workout'
        ]
      })
    }
    const deletedWorkout = services.deleteWorkout(workoutId)
    return res.status(204).send({
      error: false,
      data: deletedWorkout,
      messages: [
        `Successfully deleted workout with id ${workoutId}`
      ]
    })
  } catch (err) {
    console.error(err)
    const status = err?.status || 500
    const msg = err?.message || 'Internal server error'
    return res.status(status).send({
      error: true,
      data: null,
      messages: [
        msg
      ]
    })
  }
}

export {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
}
