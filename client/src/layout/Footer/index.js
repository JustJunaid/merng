import React from 'react'
import styled from 'styled-components'

const StyledFooterContainer = styled.div`
	@media only screen and (max-width: 600px) {
		display: none;
	}
`

export default function Footer() {
	return <StyledFooterContainer>Footer</StyledFooterContainer>
}
