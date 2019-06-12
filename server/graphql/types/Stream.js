module.exports = `
  type Stream {
    _id: ID!
    title: String!
    imageUrl: String!
    streamer: User!
    product: Product
  }
`;
