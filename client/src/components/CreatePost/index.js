import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Input, Button } from 'antd'

const { TextArea } = Input

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
		try {
			const result = await createPost({ variables: { author, body: postBody } })
			setPosts([result.data.createPost, ...posts])
			setAuthor('')
			setPostBody('')
		} catch {
			console.log('Something went wrong!')
		}
	}

	return (
		<div style={{ margin: 20 }}>
			<h3>Write New Post below!</h3>
			<Input
				size="large"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				type="text"
				placeholder="Enter your Name"
				className="mt-20"
			/>
			<TextArea
				value={postBody}
				onChange={(e) => setPostBody(e.target.value)}
				placeholder="Write Your Post Here..."
				className="mt-20"
				rows={4}
			/>
			<div className="mt-20" style={{ textAlign: 'center' }}>
				<Button
					onClick={handleSubmit}
					type="primary"
					shape="round"
					size={'large'}
				>
					Submit
				</Button>
			</div>
		</div>
	)
}
