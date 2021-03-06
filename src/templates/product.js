import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import { setConfig } from 'react-hot-loader'

import { media } from '../utils/media'

import Layout from '../components/Layout'
import QuantitySelector from '../components/QuantitySelector'

import { Section } from '../components/StyledComponents'

// not sure what this does
setConfig({ pureSFC: true })

const ProductTitle = styled.h1`
  text-align: center;
  ${media.desktop`
    margin-bottom: 4rem;
  `}
`

const Container = styled.div`
  max-width: 900px;
  margin: auto;
`

const Price = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  margin-top: 1rem;
  display: block;

  ${media.desktop`
    font-size: 48px;
  `}
`

const Description = styled.div`
  font-family: 600;
  font-size: 18px;
  color: #4A4A4A;
  letter-spacing: 0;
`

const QuantityGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const QuantityTitle = styled.div`
  font-size: 24px;
`

const AddToCartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};;
  height: 48px;
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  padding: 0 2rem;
  justify-self: flex-end;
  transition-duration: 200ms;

  :hover {
    background-color: #440B6F;
    transition-duration: 200ms;
  }
`

const BuyItNowButton = styled(AddToCartButton)`
  background-color: ${props => props.theme.colors.black};

  :hover {
    background-color: rgba(0,0,0,.9);
    transition-duration: 200ms;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`

const ProductTemplate = ({ data }) => {
  const {
    name,
    image,
    id,
    price,
    fields,
    description,
  } = data.contentfulProduct

  const { siteUrl } = data.site.siteMetadata

  const [quantity, setQuantity] = useState(1)

  return (
    <Layout>
      <Section
        css={css`
          padding: 88px 16px;
        `}
      >
      <Container>
        <ProductTitle>{name}</ProductTitle>
        <div
          css={css`
          padding: 16px;
          ${media.desktop`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 80px;
            padding: 0;
          `}
        `}>
          <Img fluid={image.fluid} alt={image.title} />
          <div css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `}>
            <Price>${price}</Price>
            <Description dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }}/>
            <QuantityGroup>
              <QuantityTitle>Quantity</QuantityTitle>
              <QuantitySelector onQuantityChange={setQuantity}/>
            </QuantityGroup>
            <ButtonGroup>
              <AddToCartButton
                className="snipcart-add-item"
                data-item-id={id}
                data-item-name={name}
                data-item-price={price}
                data-item-quantity={`${quantity}`}
                data-item-url={`${siteUrl}/${fields.path}`}
              >Add to cart</AddToCartButton>
              <BuyItNowButton
                className="snipcart-add-item"
                data-item-id={id}
                data-item-name={name}
                data-item-price={price}
                data-item-quantity="1"
                data-item-url={`${siteUrl}/${fields.path}`}
              >Buy it now</BuyItNowButton>
            </ButtonGroup>
          </div>
        </div>
      </Container>
      </Section>
    </Layout>
  )
}

export default ProductTemplate

export const productTemplateQuery = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      id
      price
      fields {
        path
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        title
        fluid(maxHeight: 400 maxWidth: 400) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`