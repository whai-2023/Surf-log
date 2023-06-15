import express from 'express'
import * as db from '../db/db'
import {addLocation, getLocations, deleteLocation} from '../db/db'
import { NewLocation } from '../../models/locations'
import { log } from 'console'

const router = express.Router()


// GET /api/vi/locations
router.get('/', async (req, res) => {
  try{
    const locations = await getLocations()
    res.json({ locations })

  } catch(error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// POST /api/vi/locations
router.post('/', async (req, res) => {
  try{
    const newLocation = req.body.newLocation as NewLocation
    if(!newLocation) {
      res.sendStatus(400)
      return
    }
    const location = await addLocation(newLocation)
    res.json({location})
  } catch(error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }
  const name = req.body.name
  await db.renameLocation(id, name)
  res.sendStatus(200)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('ID must be a number')
    return
  }

  try {
   await db.deleteLocation(id)
  res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).send('could not delete location')
    
  }
})

export default router