interface UserType  {
    id: string
    name: string
    email: string
    password: string
    userName: string
    salt: string

}

interface UserAttributes {
    id: string
    name: string
    email: string
    password: string
    userName: string
    salt: string

}

interface ServiceType  {
    id: string
    name: string
    description: string
    available: string
    categoryID: string
    companyID: string
}

interface ServiceAttributes {
    id: string
    name: string
    description: string
    available: string
    categoryID: string
    companyID: string
}

interface ReservaType  {
    id: string
    name: string
    description: string
    available: string
    categoryID: string
    companyID: string
    clientID: string
}

interface ReservaAttributes {
    id: string
    name: string
    description: string
    available: string
    categoryID: string
    companyID: string
    clientID: string
}

interface ReservaType  {
    id: string
    name: string
    description: string
    available: string
    categoryID: string
    companyID: string
    clientID: string
}

interface CategoryType {
    id: string
    name: string
}

interface CategoryAttributes {
    id: string
    name: string
}

interface SubCategoryType {
    id: string
    name: string
    categoryID: string
}

interface SubCategoryAttributes {
    id: string
    name: string
    categoryID: string
}

interface ClientFollowedCompanyType {
    id: string
    clientID: string
    companyID: string
}

interface ClientFollowedCompanyAttributes {
    id: string
    clientID: string
    companyID: string
}

interface UserServicesFavoritesType {
    id: string
    clientID: string
    companyID: string
}

interface UserServicesFavoritesAttributes {
    id: string
    clientID: string
    serviceID: string
}

interface ReservaCategoryType {
    id: string
    clientID: string
    companyID: string
}

interface ReservaCategoryAttributes {
    id: string
    clientID: string
    serviceID: string
}

interface ServiceCategoryType {
    id: string
    clientID: string
    companyID: string
}

interface ServiceCategoryAttributes {
    id: string
    clientID: string
    serviceID: string
}
export {
    UserType,
    UserAttributes,
    ServiceType,
    ServiceAttributes,
    ReservaType,
    ReservaAttributes,
    CategoryType,
    CategoryAttributes,
    SubCategoryType,
    SubCategoryAttributes,
    ClientFollowedCompanyType,
    ClientFollowedCompanyAttributes,
    UserServicesFavoritesType,
    UserServicesFavoritesAttributes,
    ReservaCategoryType,
    ReservaCategoryAttributes,
    ServiceCategoryType,
    ServiceCategoryAttributes,
}