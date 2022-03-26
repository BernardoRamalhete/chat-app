const getEmail = (users, userLogged) => (
    users?.filter(filtering => filtering !== userLogged?.email)[0]
)

export default getEmail