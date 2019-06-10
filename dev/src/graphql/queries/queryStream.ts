import gql from 'graphql-tag';

export const QUERY_STREAM = gql`
	query queryStream($id: ID!) {
		queryStream(id: $id) {
			_id
			title
			imageUrl
			streamer {
				_id
				email
				firstname
				lastname
				avatar
			}
			product {
				title
				imageUrl
				price
				content
			}
		}
	}
`;
