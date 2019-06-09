const {
  buildSchema
} = require('graphql');

const ProfileType = require('./types/Profile');
const AuthDataType = require('./types/AuthData');
const ProductsType = require('./types/Products');
const ProductType = require('./types/Product');
const UsersType = require('./types/Users');
const UserType = require('./types/user');

const ProfileInputData = require('./inputs/ProfileInputData');
const ProfileEditInputData = require('./inputs/ProfileEditInputData');
const ProductInputData = require('./inputs/ProductInputData');
const ProductEditInputData = require('./inputs/ProductEditInputData');

module.exports = buildSchema(`
  ${ProfileType}
  ${AuthDataType}
  ${ProductsType}
  ${ProductType}
  ${UsersType}
  ${UserType}

  ${ProfileInputData}
  ${ProfileEditInputData}
  ${ProductInputData}
  ${ProductEditInputData}

  type RootQuery {
    queryProfile(token: String!): Profile!
    login(email: String!, password: String!): AuthData!
    queryUsers: UsersData!
    queryUser(id: ID!): User!
    queryProducts: ProductsData!
    queryProduct(id: ID!): Product!
  }

  type RootMutation {
    createProfile(userInput: ProfileInputData): Profile!
    editProfile(userInput: ProfileEditInputData): Profile!
    createProduct(productInput: ProductInputData): Product!
    editProduct(productInput: ProductEditInputData): Product!
    deleteProduct(id: ID!): Boolean
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
