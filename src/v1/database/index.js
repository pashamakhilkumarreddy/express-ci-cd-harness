import * as workout from './workout.js'
import * as record from './record.js'

export default {
  ...workout,
  ...record
}

export * from './workout.js'
export * from './record.js'
