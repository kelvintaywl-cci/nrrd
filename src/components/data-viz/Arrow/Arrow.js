import React from 'react'

import createStyles from '@material-ui/styles/createStyles'
import withStyles from '@material-ui/styles/withStyles'
import useTheme from '@material-ui/styles/useTheme'
import Box from '@material-ui/core/Box'

const DefaultContainer = withStyles((theme, additionalStyles) =>
  createStyles({
    root: {
      borderBottom: `2px solid ${ theme.palette.grey[700] }`,
      color: theme.palette.grey[800],
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.h4.fontWeight,
      marginBottom: theme.spacing(2),
      marginTop: 0,
      ...additionalStyles
    },
  })
)(Box)

const CompactContainer = withStyles((theme, additionalStyles) =>
  createStyles({
    root: {
      borderBottom: `2px solid ${ theme.palette.grey[700] }`,
      color: theme.palette.grey[800],
      fontSize: '1rem',
      fontWeight: theme.typography.h4.fontWeight,
      marginBottom: theme.spacing(0),
      marginTop: 0,
      ...additionalStyles
    },
  })
)(Box)

/**
 * This is to display and format a title for a chart
 */
const Arrow = props => {
  const theme = useTheme()

  return (
    <div>Arrow</div>
  )
}

export default Arrow
