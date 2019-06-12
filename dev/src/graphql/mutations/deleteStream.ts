import gql from 'graphql-tag';

export const DELETE_STREAM = gql`
	mutation deleteStream($id: ID!) {
		deleteStream(id: $id)
	}
`;
