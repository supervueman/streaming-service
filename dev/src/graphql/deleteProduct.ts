import gql from 'graphql-tag';

export const DELETE_PRODUCT = gql`
	mutation deleteProduct($id: String!) {
		deleteProduct(id: $id)
	}
`;
