const express = require('express')
const router = express.Router()
const ContactModel = require('../models/contactMongo.model')
const m = require('../helpers/middlewares')

/* All contacts */
router.get('/', m.checkAccess, async (req, res) => {
  try {
    const contacts = await ContactModel.find()
    res.json(contacts)
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(500).json({ message: err.message })
    }
  }
})

/* Get a contact by id */
router.get('/:id', m.checkAccess, async (req, res) => {
  const id = req.params.id

  try {
    const contact = await ContactModel.findById(id)
    res.json(contact)
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(404).json({ message: 'Wrong ID' })
    }
  }
})

/* add a new contact */
router.post('/', m.checkAccess, async (req, res) => {
  const contact = new ContactModel({
    name: req.body.name,
    nickname: req.body.nickname,
    email: req.body.email,
    phone_number: req.body.phone_number,
    notes: req.body.notes
  })

  try {
    const contactSaved = await contact.save()

    res.status(201).json({
      message: `The contact has been added`,
      content: contactSaved
    })
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(500).json({ message: err.message })
    }
  }
})

/* Update a contact */
router.put('/:id', m.checkAccess, async (req, res) => {
  const id = req.params.id

  try {
    const updatedContact = await ContactModel.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          nickname: req.body.nickname,
          email: req.body.email,
          phone_number: req.body.phone_number,
          notes: req.body.notes
        }
      }
    )

    res.json({
      message: `The contact has been updated`,
      content: updatedContact
    })
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(500).json({ message: err.message })
    }
  }
})

/* Delete a contact */
router.delete('/:id', m.checkAccess, async (req, res) => {
  const id = req.params.id

  try {
    const removedContact = await ContactModel.remove({ _id: id })

    res.json({
      message: `The contact has been deleted`
    })
  } catch (err) {
    if (err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(500).json({ message: err.message })
    }
  }
})

module.exports = router
