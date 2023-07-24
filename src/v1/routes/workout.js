import { Router } from 'express'
import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getRecordForWorkout
} from '../../controllers/index.js'

const router = Router()

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/workout"
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Fetched all workouts
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Error
 */
router.get('/', getAllWorkouts)

/**
 * @openapi
 * /api/v1/:workoutId:
 *   get:
 *     tags:
 *       - Get workout
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   $ref: "#/components/schemas/workout"
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Fetched workout
 *       400:
 *         description: WorkoutId is necessary to fetch the workout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: WorkoutId is required
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Error
 */
router.get('/:workoutId', getWorkout)

/**
 * @openapi
 * /api/v1/:workoutId/records:
 *   get:
 *     tags:
 *       - Get record for a workout
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   $ref: "#/components/schemas/record"
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Fetched record
 *       400:
 *         description: WorkoutId is necessary to fetch the record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: WorkoutId is required
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Error
 */
router.get('/:workoutId/records', getRecordForWorkout)

/**
 * @openapi
 * /api/v1/workouts:
 *   post:
 *     tags:
 *       - Create Workout
 *     requestBody:
 *       description: A JSON object containing workout information
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/workout"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   $ref: "#/components/schemas/workout"
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Created new workout
 *       400:
 *         description: Payload is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: name, mode, equipment is required
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Error
 */
router.post('/', createWorkout)

/**
 * @openapi
 * /api/v1/:workoutId:
 *   put:
 *     tags:
 *       - Update workout
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the workout to update
 *     requestBody:
 *       description: A JSON object containing workout information
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              $ref: "#/components/schemas/workout"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   $ref: "#/components/schemas/workout"
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Updated workout
 *       400:
 *         description: WorkoutId is necessary to update the workout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: WorkoutId is required
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Error
 */
router.put('/:workoutId', updateWorkout)

/**
 * @openapi
 * /api/v1/:workoutId:
 *   delete:
 *     tags:
 *       - Delete Workout
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the workout to delete
 *     responses:
 *       204:
 *         description: The resource was deleted successfully.
 *       400:
 *         description: WorkoutId is necessary to delete the workout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: WorkoutId is required
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                    type: null
 *                    example: null
 *                 messages:
 *                   type: array
 *                   items:
 *                      type: string
 *                      example: Error
 */
router.delete('/:workoutId', deleteWorkout)

export default router
