import gql from 'graphql-tag';

export const QUERY_STREAMS = gql`
	query {
		queryStreams {
			streams {
				_id
				title
				imageUrl
				streamer {
					_id
					firstname
					lastname
				}
			}
			count
		}
	}
`;
