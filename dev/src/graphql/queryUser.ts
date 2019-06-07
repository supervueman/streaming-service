import gql from 'graphql-tag';

export const QUERY_USER = gql`
	query queryUser($id: String!) {
		queryUser(id: $id) {
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
