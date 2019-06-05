import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation createUser($email: String!, $password: String!) {
		createUser(userInput: { email: $email, password: $password }) {
			_id
			email
		}
	}
`;
