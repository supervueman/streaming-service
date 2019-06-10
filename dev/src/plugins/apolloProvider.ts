import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import VueApollo from 'vue-apollo';
// HTTP connexion to the API
const httpLink: HttpLink = new HttpLink({
	// You should use an absolute URL here
	uri: 'http://localhost:3000/graphql'
});

// Cache implementation
const cache: InMemoryCache = new InMemoryCache({
	addTypename: false
});

const authLink: any = setContext(
	(_, { headers }): any => {
		// get the authentication token from local storage if it exists
		const token = localStorage.getItem('access_token');
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				Authorization: token ? token : ''
			}
		};
	}
);

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache
});

Vue.use(VueApollo);

const apolloProvider: VueApollo = new VueApollo({
	defaultClient: apolloClient
});

export default apolloProvider;
