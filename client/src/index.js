import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { gql } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import Posts from './components/Posts'
import CreatePost from './components/Posts/CreatePost'

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div>
				<h2>My first Apollo app 🚀</h2>
			</div>
			<Posts />
		</ApolloProvider>
	)
}

render(<App />, document.getElementById('root'))
