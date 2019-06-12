import gql from 'graphql-tag';

export const CREATE_STREAM = gql`
	mutation createStream($title: String!, $imageUrl: String!, $prodId: ID) {
		createStream(
			streamInput: { title: $title, imageUrl: $imageUrl, prodId: $prodId }
		) {
			_id
			title
			imageUrl
			streamer {
				_id
				email
			}
			product {
				_id
				title
				price
				imageUrl
			}
		}
	}
`;
