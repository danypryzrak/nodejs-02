const mapBookOutput = (bookDocument) => {
  const { _id, ...rest } = bookDocument.toObject()

  const mappedBook = {
    id: _id,
    ...rest,
  }

  return mappedBook
}

module.exports = {
  mapBookOutput,
}