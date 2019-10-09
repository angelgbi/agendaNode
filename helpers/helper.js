const fileSys = require('fs')

function writeJSONFile(filename, content) {
  fileSys.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

const setId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

function checkId(array, id) {
  return new Promise((resolve, reject) => {
    const contact = array.find((r) => r.id == id)
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
  checkId,
  writeJSONFile
}
