interface UserType {
  id: string
  name: string
  email: string
  password: string
  userName: string
  salt: string
}

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  userName: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ServiceType {
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
  createdAt: Date;
  updatedAt: Date;
}


interface ReservaType {
  id: string
  serviceID: string
  clientID: string
  categoryID: string
}

interface ReservaAttributes {
  id: string
  serviceID: string
  clientID: string
  categoryID: string
  createdAt: Date;
  updatedAt: Date;
}


interface CategoryType {
  id: string
  name: string
}

interface CategoryAttributes {
  id: string
  name: string
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
