const express = require('express')
const router = express.Router()
const contact = require('../models/contact.model')

/* All contacts */
router.get('/', async (req, res) => {
  await contact
    .getAll()
    .then((contacts) => res.json(contacts))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

/* Get a contact by id */
router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (id == parseInt(id)) {
    await contact
      .getContact(id)
      .then((contact) => res.json(contact))
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
  } else res.status(404).json({ message: 'Wrong ID' })
})

/* add a new contact */
router.post('/', async (req, res) => {
  await contact
    .addContact(req.body)
    .then((contact) =>
      res.status(201).json({
        message: `The contact '${contact.name}' has been added`,
        content: contact
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message })
      } else {
        res.status(500).json({ message: err.message })
      }
    })
})

/* Update a contact */
router.put('/:id', async (req, res) => {
  const id = req.params.id

  if (id == parseInt(id)) {
    await contact
      .updateContact(id, req.body)
      .then((contact) =>
        res.json({
          message: `The contact '${contact.name}' has been updated`,
          content: contact
        })
      )
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
  } else res.status(404).json({ message: 'Wrong ID' })
})

/* Delete a contact */
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  if (id == parseInt(id)) {
    await contact
      .deleteContact(id)
      .then(() =>
        res.json({
          message: `The contact #${id} has been deleted`
        })
      )
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
  } else res.status(404).json({ message: 'Wrong ID' })
})

module.exports = router
