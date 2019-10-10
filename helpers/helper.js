const fileSys = require('fs')

function writeJSONFile(filename, content) {
  return new Promise((resolve, reject) => {
    fileSys.writeFile(
      filename,
      JSON.stringify(content, null, 2),
      'utf-8',
      (err) => {
        if (err) {
          reject({
            message: 'Sorry. Failed to save',
            status: 500
          })
        } else {
          resolve()
        }
      }
    )
  })
}

const setId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

function getContactById(array, id) {
  return new Promise((resolve, reject) => {
    const contact = array.find((c) => c.id == id)
    if (!contact) {
      reject({
        message: 'Wrong ID',
        status: 404
      })
    }
    resolve(contact)
  })
}

module.exports = {
  setId,
  getContactById,
  writeJSONFile
}
