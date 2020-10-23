import React from 'react'
import { useMutation, gql } from '@apollo/client'

const DELETE_POST = gql`
	mutation DeletePost($id: String!) {
		deletePost(id: $id)
	}
`

export default function DeletePost({ postId, posts, setPosts }) {
	const [deletePost, { data }] = useMutation(DELETE_POST)
	console.log('postid ', postId)

	return (
		<div
			onClick={async () => {
				await deletePost({ variables: { id: postId } })
				const remainingPost = posts.slice(0, posts.length - 1)
				setPosts(remainingPost)
			}}
		>
			X
		</div>
	)
}
