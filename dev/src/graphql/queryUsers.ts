import gql from 'graphql-tag';

export const QUERY_USERS = gql`
	query {
		users {
			users {
				_id
				firstname
				lastname
				avatar
				email
				phone
			}
			count
		}
	}
`;
