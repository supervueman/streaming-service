import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
// HTTP connexion to the API
const httpLink: any = new HttpLink({
	// You should use an absolute URL here
	uri: 'http://localhost:3000/graphql'
});

// Cache implementation
const cache: any = new InMemoryCache();

// Create the apollo client
export const apolloClient: any = new ApolloClient({
	link: httpLink,
	cache
});

Vue.use(VueApollo);

const apolloProvider: any = new VueApollo({
	defaultClient: apolloClient
});

export default apolloProvider;
