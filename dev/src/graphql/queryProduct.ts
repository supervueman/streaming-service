import gql from 'graphql-tag';

export const QUERY_PRODUCT = gql`
	query queryProduct($prodId: String!) {
		queryProduct(prodId: $prodId) {
			_id
			title
			imageUrl
			price
			content
		}
	}
`;
