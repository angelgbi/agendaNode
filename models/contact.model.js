const helper = require('../helpers/helper')
const filename = './data/contacts.json'
let contacts = require('../data/contacts.json')

function getAll() {
  return new Promise((resolve, reject) => {
    if (contacts.length > 0) {
      resolve(contacts)
    } else {
      reject({
        message: 'Sorry. No contacts found',
        status: 204
      })
    }
  })
}

function getContact(id) {
  return new Promise((resolve, reject) => {
    helper
      .getContactById(contacts, id)
      .then((contact) => resolve(contact))
      .catch((e) => reject(e))
  })
}

function addContact(newContact) {
  return new Promise((resolve, reject) => {
    newContact.id = helper.setId(contacts)
    contacts.push(newContact)

    helper
      .writeJSONFile(filename, contacts)
      .then(resolve(newContact))
      .catch(() =>
        reject({
          message: 'Sorry. Contact not added',
          status: 500
        })
      )
  })
}

function updateContact(id, contactUpdated) {
  return new Promise((resolve, reject) => {
    helper
      .getContactById(contacts, id)
      .then(() => {
        const index = contacts.findIndex((c) => c.id == id)
        contacts[index] = contactUpdated
        contacts[index].id = id

        helper
          .writeJSONFile(filename, contacts)
          .then(resolve(contacts[index]))
          .catch(() =>
            reject({
              message: 'Sorry. Contact not updated',
              status: 500
            })
          )
      })
      .catch((e) => reject(e))
  })
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    helper
      .getContactById(contacts, id)
      .then(() => {
        contacts = contacts.filter((c) => c.id != id)

        helper
          .writeJSONFile(filename, contacts)
          .then(resolve())
          .catch(() =>
            reject({
              message: 'Sorry. Contact not deleted',
              status: 500
            })
          )
      })
      .catch((e) => reject(e))
  })
}

module.exports = {
  getAll,
  getContact,
  addContact,
  updateContact,
  deleteContact
}
