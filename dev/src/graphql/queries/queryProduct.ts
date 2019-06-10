import gql from 'graphql-tag';

export const QUERY_PRODUCT = gql`
	query queryProduct($id: ID!) {
		queryProduct(id: $id) {
			_id
			title
			imageUrl
			price
			content
		}
	}
`;
