const {
  buildSchema
} = require('graphql');

const ProfileType = require('./types/Profile');
const AuthDataType = require('./types/AuthData');
const ProductType = require('./types/Product');
const UsersType = require('./types/Users');
const UserType = require('./types/user');

const ProfileInputData = require('./inputs/ProfileInputData');
const ProfileEditInputData = require('./inputs/ProfileEditInputData');
const ProductInputData = require('./inputs/ProductInputData');

module.exports = buildSchema(`
  ${ProfileType}
  ${AuthDataType}
  ${ProductType}
  ${UsersType}
  ${UserType}

  ${ProfileInputData}
  ${ProfileEditInputData}
  ${ProductInputData}

  type RootQuery {
    queryProfile(token: String!): Profile!
    login(email: String!, password: String!): AuthData!
    queryUsers: UsersData!
    queryUser(userId: String!): User!
  }

  type RootMutation {
    createProfile(userInput: ProfileInputData): Profile!
    editProfile(userInput: ProfileEditInputData): Profile!
    createProduct(productInput: ProductInputData): Product!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
