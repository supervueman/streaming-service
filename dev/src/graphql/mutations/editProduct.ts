import gql from 'graphql-tag';

export const EDIT_PRODUCT = gql`
	mutation editProduct(
		$id: ID!
		$title: String!
		$imageUrl: String!
		$price: Int!
		$content: String!
	) {
		editProduct(
			productInput: {
				id: $id
				title: $title
				imageUrl: $imageUrl
				price: $price
				content: $content
			}
		) {
			_id
			title
			imageUrl
			price
			content
		}
	}
`;
