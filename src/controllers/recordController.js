import services from '../services/index.js'

const getRecordForWorkout = (req, res) => {
  try {
    const { workoutId } = req.params
    if (
      !workoutId
    ) {
      return res.status(400).send({
        error: true,
        data: null,
        messages: [
          'WorkoutId is necessary to fetch the record'
        ]
      })
    }
    const record = services.getRecordForWorkout(workoutId)
    return res.status(200).send({
      error: false,
      data: record,
      messages: [
        `Successfully fetched record with workout id ${workoutId}`
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
  getRecordForWorkout
}
