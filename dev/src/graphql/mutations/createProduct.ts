import gql from 'graphql-tag';

export const CREATE_PRODUCT = gql`
	mutation createProduct(
		$title: String!
		$content: String!
		$imageUrl: String!
		$price: Int!
	) {
		createProduct(
			productInput: {
				title: $title
				content: $content
				imageUrl: $imageUrl
				price: $price
			}
		) {
			_id
			title
			content
			imageUrl
			price
			creator {
				_id
				email
			}
		}
	}
`;
