import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

const CREATE_POST = gql`
	mutation CreatePost($author: String!, $body: String!) {
		createPost(author: $author, body: $body) {
			id
			author
			body
		}
	}
`

export default function CreatePost({ posts, setPosts }) {
	const [author, setAuthor] = useState()
	const [postBody, setPostBody] = useState()
	const [createPost, { data }] = useMutation(CREATE_POST)

	const handleSubmit = async () => {
		const result = await createPost({ variables: { author, body: postBody } })
		setPosts([...posts, result.data.createPost])
		setAuthor('')
		setPostBody('')
	}

	return (
		<>
			<h3>Write New Post below!</h3>
			<input
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				type="text"
				placeholder="Enter your Name"
			/>
			<textarea
				value={postBody}
				onChange={(e) => setPostBody(e.target.value)}
				placeholder="Write Your Post Here..."
			/>
			<button onClick={handleSubmit}>Submit</button>
		</>
	)
}
