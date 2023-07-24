import { Router } from 'express'
import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../../controllers/index.js'

const router = Router()

router.get('/', getAllWorkouts)

router.get('/:workoutId', getWorkout)

router.post('/', createWorkout)

router.put('/:workoutId', updateWorkout)

router.delete('/:workoutId', deleteWorkout)

export default router
