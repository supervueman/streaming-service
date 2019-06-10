import gql from 'graphql-tag';

export const EDIT_PRODUCT = gql`
	mutation editProduct(
		$prodId: String!
		$title: String!
		$imageUrl: String!
		$price: Int!
		$content: String!
	) {
		editProduct(
			productInput: {
				prodId: $prodId
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
