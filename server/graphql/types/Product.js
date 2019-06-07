module.exports = `
  type Product {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    price: Int!
    creator: Profile!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
