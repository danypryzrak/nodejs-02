const { getContacts, getContactById, createContact, deleteContact, updateContactById, updateFavorite } = require("./contacts-controller");
const { userLogin, userRegister, userLogOut, userCurrent } = require("./users-controller");


module.exports = {
    userRegister,
    userLogin,
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContactById,
    updateFavorite,
    userLogOut,
    userCurrent
}
