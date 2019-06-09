import gql from 'graphql-tag';

export const QUERY_PRODUCTS = gql`
	query {
		queryProducts {
			products {
				_id
				title
				imageUrl
				price
				content
			}
			count
		}
	}
`;
