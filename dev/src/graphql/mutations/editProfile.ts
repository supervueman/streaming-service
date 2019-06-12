import gql from 'graphql-tag';

export const EDIT_PROFILE = gql`
	mutation editProfile(
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
		$isStream: Boolean!
	) {
		editProfile(
			userInput: {
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
				isStream: $isStream
			}
		) {
			_id
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
			isStream
		}
	}
`;
