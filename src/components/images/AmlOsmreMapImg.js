import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

export default ({ alt, ...rest }) => {
  const data = useStaticQuery(graphql`
  query {
      imageSharp(fixed: {originalName: {eq: "AML_OSMREmap.png"}}) {
        fixed(width: 551) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  `)
  if (data.imageSharp === null) {
    console.warn('data: ', data)
  }

  return (
    <>
      {data.imageSharp &&
      <Img fixed={data.imageSharp.fixed} alt={alt || 'Office of Surface Mining Reclamation and Enforcement\'s data site.'} {...rest} />
      }
    </>
  )
}
