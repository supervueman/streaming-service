const {
  buildSchema
} = require('graphql');

const UserType = require('./types/User');
const AuthDataType = require('./types/AuthData');
const ProductType = require('./types/Product');
const UsersType = require('./types/Users');

const UserInputData = require('./inputs/UserInputData');
const UserEditInputData = require('./inputs/UserEditInputData');
const ProductInputData = require('./inputs/ProductInputData');

module.exports = buildSchema(`
  ${UserType}
  ${AuthDataType}
  ${ProductType}
  ${UsersType}

  ${UserInputData}
  ${UserEditInputData}
  ${ProductInputData}

  type RootQuery {
    queryProfile(token: String!): User!
    login(email: String!, password: String!): AuthData!
    users: UsersData!
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
    editUser(userInput: UserEditInputData): User!
    createProduct(productInput: ProductInputData): Product!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
