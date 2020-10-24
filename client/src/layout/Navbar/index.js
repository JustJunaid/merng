import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
// import { HomeOutlined, ProfileOutlined } from '@ant-design/icons'
import { HomeTwoTone, ProfileTwoTone } from '@ant-design/icons'

const StyledNavbarContainer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 60px;
	background: #c2c2c2;

	display: flex;
	align-items: center;
	justify-content: center;
`

const StyledCol = styled(Col)`
	text-align: center;
`

const IconStyles = { fontSize: '32px', color: '#fff', cursor: 'pointer' }

export default function Navbar() {
	return (
		<StyledNavbarContainer>
			<StyledCol span={12}>
				<HomeTwoTone style={IconStyles} />
			</StyledCol>
			<StyledCol span={12}>
				<ProfileTwoTone style={IconStyles} />
			</StyledCol>
		</StyledNavbarContainer>
	)
}
