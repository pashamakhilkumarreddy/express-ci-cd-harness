import workout from './workout.js'

export default ({ app }) => {
  app.use('/api/v1/workouts', workout)
}
