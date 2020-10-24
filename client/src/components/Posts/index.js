import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card, Avatar } from 'antd'
import styled from 'styled-components'
import DeletePost from '../DeletePost'
import CreatePost from '../CreatePost'

const { Meta } = Card

const POSTS = gql`
	query {
		getPosts {
			id
			body
			author
		}
	}
`

const StyledCard = styled(Card)`
	width: auto !important;
	margin: 20px;
`

export default function Posts() {
	const [posts, setPosts] = useState()
	const { loading, error, data } = useQuery(POSTS)

	useEffect(() => {
		if (data) setPosts(data.getPosts)
	}, [data])

	if (error) return 'Something went wrong!'

	return (
		<>
			<CreatePost posts={posts} setPosts={setPosts} />
			<div style={{ height: '50vh', overflow: 'scroll' }}>
				{posts?.map(({ id, author, body }) => (
					<StyledCard key={id} loading={loading}>
						<Meta
							avatar={
								<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
							}
							title={
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<div>{author}</div>
									<DeletePost postId={id} posts={posts} setPosts={setPosts} />
								</div>
							}
							description={body}
						/>
					</StyledCard>
				))}
			</div>
		</>
	)
}
