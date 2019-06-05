const {
  buildSchema
} = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String
    products: [Product!]!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  type Product {
    _id: ID!
    slug: String!
    title: String!
    content: String!
    imageUrl: String!
    price: Int!
    creator: User!
    createdAt: String!
    updatedAt: String!
  }

  input UserInputData {
    email: String!
    password: String!
  }

  input ProductInputData {
    slug: String!
    title: String!
    content: String!
    imageUrl: String!
    price: Int!
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
    createProduct(productInput: ProductInputData): Product!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
