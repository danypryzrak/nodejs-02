const { ContactModel } = require("../database/models/contacts.models")

const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find()
    res.json({ message: 'Here is all contacts', contacts, })
    res.status(200)
  } catch(error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const id = req.params.contactId
  try {
    const contact = await ContactModel.findOne({ _id: id })
    if (!contact) {
      res.status(404)
      res.json({ message: 'Not found' })
    } else {
      res.status(200)
      res.json({ message: 'Here is your desire contact', contact })
    }
  } catch (error){
    next(error)
  }
}

const createContact = async (req, res, next) => {
    try {
    const user = req.user
    const { name, email, phone } = req.body
  
    const newContact = await ContactModel.create({ name, email, phone, owner: user })
    res.status(200).json({ message: "Your contact was successfully added" })
  } catch (error){
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId
  const delContact = await ContactModel.findByIdAndRemove({ _id: id })
  if (delContact) {
  res.status(200).json({message: "contact deleted", delContact})
  } else {
    res.status(404).json({message: "Not found"})
  }
}

const updateContactById = async (req, res, next) => {
  const id = req.params.contactId
  const body = req.body
  const { name, email, phone } = body
  if (!body) {
    res.status(404).json({ message: "missing fields" })
  } else {
    const isSuccess = await ContactModel.findByIdAndUpdate({ _id: id }, { name, email, phone }, { new: true });
    if (isSuccess) {
      res.status(200).json({ message: "contact updated" })
    } else {
      res.status(404).json({ message: "Not found" })
    }
  }
}

const updateFavorite = async (req, res, next) => {
  const id = req.params.contactId
  const body = req.body
  const { favorite } = body
  if (!body) {
    res.status(404).json({ message: "missing fields favorite" })
  } else {
    const changedContact = await ContactModel.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
    if (changedContact) {
      res.status(200).json({ message: "Now is favorite", changedContact})
    } else {
      res.status(404).json({ message: "Not found" })
    }
  }
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContactById,
    updateFavorite
}