import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

// utility functions
import utils from '../../../../js/utils'
import { StoreContext } from '../../../../store'

import { DataFilterContext } from '../../../../stores/data-filter-store'
import { DATA_FILTER_CONSTANTS as DFC } from '../../../../constants'
import CONSTANTS from '../../../../js/constants'

import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  useTheme
} from '@material-ui/core'

// import CloseIcon from '@material-ui/icons/Close'
// import IconMap from '-!svg-react-loader!../../../img/svg/icon-us-map.svg'
import CircleChart from '../../../data-viz/CircleChart/CircleChart.js'

const APOLLO_QUERY = gql`
  query FiscalProduction($year: Int!, $location: String!, $commodity: String!, $state: String!) {
    fiscal_production_summary(where: {location_type: {_eq: $location}, state_or_area: {_nin: ["Nationwide Federal", "Native American", ""]}, fiscal_year: { _eq: $year }, commodity: {_eq: $commodity}, state: {_eq: $state}}, order_by: {sum: desc}) {
      location_name
      unit_abbr
      fiscal_year
      state_or_area
      sum
      
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    width: '100%',
    margin: theme.spacing(1),
    '@media (max-width: 768px)': {
      maxWidth: '100%',
      margin: 0,
    }
  },
  progressContainer: {
    maxWidth: '25%',
    display: 'flex',
    '& > *': {
      marginTop: theme.spacing(3),
      marginRight: 'auto',
      marginLeft: 'auto',
    }
  },
  circularProgressRoot: {
    color: theme.palette.primary.dark,
  },
  chartHorizontal: {
    '& .chart-container': {
      display: 'flex',
      // alignItems: 'top',
      '@media (max-width: 426px)': {
        display: 'block',
        margin: 0,
      },
      '& .chart': {
        marginRight: theme.spacing(2),
        width: '70%',
        '@media (max-width: 426px)': {
          marginRight: 0,
        },
      },
    },
  },
  chartVertical: {
    '& .chart-container': {
      display: 'block',
      margin: 0,
    },
    '& .chart': {
      margin: 0,
      width: '100%',
    },
  }
}))

const ProductionTopLocations = ({ title, ...props }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { state: filterState } = useContext(DataFilterContext)
  const year = (filterState[DFC.YEAR]) ? filterState[DFC.YEAR] : 2019
  const location = (filterState[DFC.COUNTIES]) ? filterState[DFC.COUNTIES] : 'State'
  const state = props.abbr
  console.debug('props: ', props)
  // if (props.abbr && props.abbr.length === 2) {
  //   location = 'County'
  //   state = props.abbr
  // }
  const commodity = (filterState[DFC.COMMODITY]) ? filterState[DFC.COMMODITY] : 'Oil (bbl)'
  console.log('apollo query: ', year, location, commodity, state)
  const { loading, error, data } = useQuery(APOLLO_QUERY,
    {
      variables: { year, location, commodity, state },
      skip: props.state === CONSTANTS.NATIVE_AMERICAN
    })

  const maxLegendWidth = props.maxLegendWidth
  if (loading) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress classes={{ root: classes.circularProgressRoot }} />
      </div>
    )
  }
  if (error) return `Error! ${ error.message }`

  let chartData = []
  const dataSet = `FY ${ year }`

  if (data) {
    chartData = data.fiscal_production_summary
    console.debug('CHART DATA', chartData)
    return (
      <Box className={classes.root}>
        {title && <Box component="h4" fontWeight="bold" mb={2}>{title}</Box>}
        <Box className={props.horizontal ? classes.chartHorizontal : classes.chartVertical}>
          <CircleChart
            data={chartData}
            maxLegendWidth={maxLegendWidth}
            xAxis='location_name'
            yAxis='sum'
            format={ d => utils.formatToCommaInt(d) }
            circleLabel={
              d => {
                // console.debug('circleLABLE: ', d)
                if (location === 'State') {
                  const r = []
                  r[0] = d.location_name
                  r[1] = utils.formatToCommaInt(d.sum) + ' ' + d.unit_abbr
                  return r
                }
                else {
                  return ['', '']
                }
              }
            }
            xLabel={location}
            yLabel={dataSet}
            maxCircles={6}
            minColor={theme.palette.green[100]}
            maxColor={theme.palette.green[600]} />
        </Box>
      </Box>
    )
  }
  else {
    return <Box className={classes.root}></Box>
  }
}

export default ProductionTopLocations

ProductionTopLocations.propTypes = {
  title: PropTypes.string
}
