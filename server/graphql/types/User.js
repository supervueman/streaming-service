module.exports = `
  type User {
    _id: ID!
    slug: String
    email: String!
    phone: String!
    website: String!
    facebook: String!
    instagram: String!
    vkontakte: String!
    firstname: String!
    lastname: String!
    avatar: String!
    content: String!
    subscribers: [User!]!
    subscriptions: [User!]!
    password: String!
    products: [Product!]!
  }
`;
