import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation createProfile($email: String!, $password: String!) {
		createProfile(userInput: { email: $email, password: $password }) {
			_id
			email
		}
	}
`;
