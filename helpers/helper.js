const fileSys = require('fs')

async function writeJSONFile(filename, content) {
  fileSys.writeFile(
    filename,
    JSON.stringify(content, null, 2),
    'utf-8',
    (err) => {
      if (err) {
        throw err
      }
    }
  )
}

const setId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

async function getContactById(array, id) {
  const contact = array.find((c) => c.id == id)
  if (!contact) {
    throw new Error('Wrong ID')
  } else return contact
}

module.exports = {
  setId,
  getContactById,
  writeJSONFile
}
