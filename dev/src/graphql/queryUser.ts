import gql from 'graphql-tag';

export const QUERY_USER = gql`
	query queryUser($userId: String!) {
		queryUser(userId: $userId) {
			_id
			firstname
			lastname
			avatar
			email
			phone
			website
			facebook
			instagram
			vkontakte
			content
		}
	}
`;
