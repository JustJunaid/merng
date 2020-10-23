const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

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

mongoose
	.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Database connected!')
		server
			.listen({
				port: 4000,
			})
			.then(({ url }) => console.log(`🚀 Server listening on port ${url}`))
	})

const server = new ApolloServer({
	typeDefs,
	resolvers,
})
