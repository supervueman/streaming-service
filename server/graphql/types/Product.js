module.exports = `
  type Product {
    _id: ID!
    slug: String!
    title: String!
    content: String!
    imageUrl: String!
    price: Int!
    creator: User!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
