import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Img from 'gatsby-image'

import { media } from '../utils/media'

const Section = styled.section`
  height: ${props => props.fullPage ? `100vh` : null};
  max-width: 1440px;
  margin: auto;
`

const Content = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 18px;

  ${media.desktop`
    max-width: 450px;
    padding: 0;
    margin: auto;
  `}
`

const HeroTitle = styled.h1`
  font-size: 24px;

  ${media.desktop`
    font-size: 48px;
  `}
`

const HeroSubTitle = styled.p`
  ${media.desktop`
    font-family: 500;
    font-size: 18px;
    color: ${props => props.theme.colors.darkGray};
  `}
`

const BuyButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  height: 48px;
  border-radius: 14px;
  width: 200px;
  cursor: pointer;
`

const Hero = props => {
  const { image, content } = props
  return (
    <Section
      fullPage
      css={css`
        padding: 16px;
        display: flex;
        flex-direction: column-reverse;
        ${media.desktop`
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 0;
        `}
      `}
    >
      <Content>
        <HeroTitle>Your website or app engraved.</HeroTitle>
        <HeroSubTitle>Because having a digital version isn't enough.</HeroSubTitle>
        <BuyButton>Buy now</BuyButton>
      </Content>
      <div>
        {image}
      </div>
    </Section>
  )
}

export default Hero

Hero.propTypes = {
  image: PropTypes.object,
  content: PropTypes.node,
}

Hero.defaultProps = {
  image: null,
  content: null,
}