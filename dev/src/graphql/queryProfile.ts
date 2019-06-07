import gql from 'graphql-tag';

export const QUERY_PROFILE = gql`
	query queryProfile($token: String!) {
		queryProfile(token: $token) {
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
