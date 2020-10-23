import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import CreatePost from './CreatePost'
import DeletePost from './DeletePost'

const POSTS = gql`
	query {
		getPosts {
			id
			body
			author
		}
	}
`

export default function Posts() {
	const [posts, setPosts] = useState()
	const { loading, error, data } = useQuery(POSTS)

	useEffect(() => {
		if (data) setPosts(data.getPosts)
	}, [data])

	return (
		<>
			<>
				{posts?.map(({ id, author, body }) => (
					<div key={id}>
						{body} - {author} {'     '}{' '}
						<DeletePost posts={posts} setPosts={setPosts} postId={id} />
					</div>
				))}
			</>
			<CreatePost posts={posts} setPosts={setPosts} />
		</>
	)
}
