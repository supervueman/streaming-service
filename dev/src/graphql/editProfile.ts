import gql from 'graphql-tag';

export const EDIT_PROFILE = gql`
	mutation editUser(
		$slug: String
		$email: String!
		$phone: String!
		$website: String!
		$facebook: String!
		$instagram: String!
		$vkontakte: String!
		$firstname: String!
		$lastname: String!
		$avatar: String!
		$content: String!
	) {
		editUser(
			userInput: {
				slug: $slug
				email: $email
				phone: $phone
				website: $website
				facebook: $facebook
				instagram: $instagram
				vkontakte: $vkontakte
				firstname: $firstname
				lastname: $lastname
				avatar: $avatar
				content: $content
			}
		) {
			_id
			slug
			email
			phone
			website
			facebook
			instagram
			vkontakte
			firstname
			lastname
			avatar
			content
		}
	}
`;
