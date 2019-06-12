import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation createProfile(
		$email: String!
		$password: String!
		$isStream: Boolean!
	) {
		createProfile(
			userInput: { email: $email, password: $password, isStream: $isStream }
		) {
			_id
			email
		}
	}
`;
