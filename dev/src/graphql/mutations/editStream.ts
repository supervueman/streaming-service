import gql from 'graphql-tag';

export const EDIT_STREAM = gql`
	mutation editStream(
		$id: ID!
		$prodId: ID
		$title: String!
		$imageUrl: String!
	) {
		editStream(
			streamInput: {
				id: $id
				prodId: $prodId
				title: $title
				imageUrl: $imageUrl
			}
		) {
			_id
			title
			imageUrl
			product {
				_id
				title
				imageUrl
				price
				content
			}
		}
	}
`;
