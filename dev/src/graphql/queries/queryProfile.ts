import gql from 'graphql-tag';

export const QUERY_PROFILE = gql`
	query queryProfile($token: String!) {
		queryProfile(token: $token) {
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
			stream {
				_id
				title
				imageUrl
			}
			isStream
		}
	}
`;
