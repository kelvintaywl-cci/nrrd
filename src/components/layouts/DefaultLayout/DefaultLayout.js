/**
 * Default Layout component
 *
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { ThemeProvider, makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import nrrdTheme from '../../../js/mui/theme'

import { Banner } from '../Banner'
import { Header } from '../Header'
import { Footer } from '../Footer'

import GlossaryDrawer from '../GlossaryDrawer/GlossaryDrawer'

console.log('nrrdTheme: ', nrrdTheme)

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      background: theme.palette.common.white,
      margin: 0,
      fontFamily: theme.typography.fontFamily
    },
    a: {
      color: nrrdTheme.palette.links.default,
      textDecoration: 'underline',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'none',
      }
    },
    img: {
      maxWidth: '100%'
    },
    '.header-bar': {
      borderWidth: '2px',
      borderBottom: 'solid',
      paddingBottom: '.41667rem',
    },
    '.green': {
      borderColor: '#cde3c3',
    },
    '.thick': {
      borderWidth: '6px',
    },
    '.shadow': {
      '-webkit-box-shadow': `3px 3px 5px 6px ${ theme.palette.common.black }`, /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
      '-moz-box-shadow': `3px 3px 5px 6px ${ theme.palette.common.black }`, /* Firefox 3.5 - 3.6 */
      'box-shadow': `3px 3px 5px 6px ${ theme.palette.common.black }`,
    }
  },
  root: {
    paddingTop: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0)
    }
  },
  site: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  siteContent: {
    margin: '0',
    maxWidth: '100%',
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    flexGrow: 1
  },
  header: {},
  skipNav: {
    position: 'absolute',
    top: '-1000px',
    left: '-1000px',
    height: '1px',
    width: '1px',
    textAlign: 'left',
    overflow: 'hidden',

    '&:active': {
      left: '0',
      top: '0',
      padding: '5px',
      width: 'auto',
      height: 'auto',
      overflow: 'visible'
    },
    '&:focus': {
      left: '0',
      top: '0',
      padding: '5px',
      width: 'auto',
      height: 'auto',
      overflow: 'visible'
    },
    '&:hover': {
      left: '0',
      top: '0',
      padding: '5px',
      width: 'auto',
      height: 'auto',
      overflow: 'visible'
    }
  }
}))

const DefaultLayout = ({ children }) => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          version
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={nrrdTheme}>
      <Box className={classes.site}>
        <a href="#main-content" className={classes.skipNav}>Skip to main content</a>

        <Banner />

        <Header className={classes.header} siteTitle={data.site.siteMetadata.title} />

        <GlossaryDrawer />

        <Box className={classes.siteContent}>
          <CssBaseline />
          <Box component="main">{children}</Box>
        </Box>

        <Footer version={data && data.site.siteMetadata.version} />
      </Box>
    </ThemeProvider>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
