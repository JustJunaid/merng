import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import './index.css'
import Layout from './layout'
import Posts from './components/Posts'
import CreatePost from './components/CreatePost'

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
})

function App() {
	return (
		<ApolloProvider client={client}>
			<Layout>
				{/* <CreatePost /> */}
				<Posts />
			</Layout>
		</ApolloProvider>
	)
}

render(<App />, document.getElementById('root'))
