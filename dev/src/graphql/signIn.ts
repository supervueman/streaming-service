import gql from 'graphql-tag';

export const SIGN_IN = gql`
	query login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			userId
		}
	}
`;
