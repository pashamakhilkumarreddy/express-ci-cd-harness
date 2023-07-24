import * as workoutService from './workoutService.js'
import * as recordService from './recordService.js'

export default {
  ...workoutService,
  ...recordService
}
