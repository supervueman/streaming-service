import gql from 'graphql-tag';

export const QUERY_USERS = gql`
	query {
		queryUsers {
			users {
				_id
				firstname
				lastname
				avatar
				email
				phone
				isStream
			}
			count
		}
	}
`;
