/* eslint-disable no-throw-literal */
import { readFileSync } from 'fs'
import find from 'lodash/find.js'
import path from 'path'
import cache from 'memory-cache'
// import { saveToDB } from './utils.js'

/**
 * @openapi
 * components:
 *   schemas:
 *     record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: aCUjasnMCjBDvWBX7RnOr
 *         workout:
 *           type: string
 *           example: AsiuyihsdBJHQ90AJKDq1
 *         record:
 *           type: string
 *           example: "300 reps"
 */

let DB

const loadDBJSON = () => {
  DB = JSON.parse(readFileSync(path.join(process.cwd(), '/src/v1/database/db.json'), {
    encoding: 'utf-8'
  }))
  cache.put('DB', DB, 300000)
}

loadDBJSON()

const getRecordForWorkout = (workoutId) => {
  try {
    const cachedDB = cache.get('DB')
    const records = cachedDB ? cachedDB.records : DB.records
    const record = find(records,
      (record) => record.workout === workoutId
    )
    if (!record) {
      throw ({
        status: 404,
        message: `Record doesn't exist for the workout with the id ${workoutId}`
      })
    }
    return record
  } catch (err) {
    throw new Error(err?.message || err)
  }
}
export {
  getRecordForWorkout
}
