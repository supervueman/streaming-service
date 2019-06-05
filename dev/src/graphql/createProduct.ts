import gql from 'graphql-tag';

export const CREATE_PRODUCT = gql`
	mutation createProduct(
		$slug: String!
		$title: String!
		$content: String!
		$imageUrl: String!
		$price: Int!
	) {
		createProduct(
			productInput: {
				slug: $slug
				title: $title
				content: $content
				imageUrl: $imageUrl
				price: $price
			}
		) {
			_id
			slug
			title
			content
			imageUrl
			price
			creator {
				_id
				email
			}
			createdAt
			updatedAt
		}
	}
`;
