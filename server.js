// const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const path = require('path')

const { dbString } = require('./config')
const Post = require('./models/Post')

const typeDefs = gql`
	type Post {
		id: ID!
		author: String!
		body: String!
		createdAt: String!
	}

	type Query {
		sayHi: String!
		getPosts: [Post]
	}

	type Mutation {
		createPost(author: String!, body: String!): Post!
		deletePost(id: String!): String!
	}
`

const resolvers = {
	Query: {
		sayHi: () => 'Junaid here',
		getPosts: () => Post.find(),
	},

	Mutation: {
		createPost: async (_, { author, body }) => {
			const result = await Post.create({
				author,
				body,
				createdAt: new Date().toISOString(),
			})
			return result
		},

		deletePost: async (_, { id }) => {
			await Post.deleteOne({ _id: id })
			return 'Post deleted!'
		},
	},
}

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
	res.sendfile(path.join(__dirname, 'client/build/index.html'))
})

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.applyMiddleware({ app })

mongoose
	.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Database connected!')
		app.listen(PORT, () =>
			console.log(
				`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
			)
		)
	})
