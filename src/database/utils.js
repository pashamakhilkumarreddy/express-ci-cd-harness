import fs from 'fs'
import path from 'path'

const saveToDB = (db) => {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), '/src/database/db.json'),
      JSON.stringify(db, null, 2),
      {
        encoding: 'utf-8'
      }
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { saveToDB }
