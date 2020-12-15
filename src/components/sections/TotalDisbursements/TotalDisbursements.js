import React, { useContext } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { DATA_FILTER_CONSTANTS as DFC } from '../../../constants'
import { DataFilterContext } from '../../../stores/data-filter-store'

import {
  Box,
  Grid
} from '@material-ui/core'

import StackedBarChart from '../../data-viz/StackedBarChart/StackedBarChart'
import SectionHeader from '../../sections/SectionHeader'
import SectionControls from '../../sections/SectionControls'
import Link from '../../../components/Link'

import utils from '../../../js/utils'

const TOTAL_DISBURSEMENTS_QUERY = gql`
  query TotalYearlyDisbursements {
    total_yearly_fiscal_disbursement {
      year,
      source,
      sum
    }   

    total_monthly_fiscal_disbursement {
      source
      sum
      month_long
      period_date
      month
     year
    }
    total_monthly_calendar_disbursement {
      source
      sum
      month_long
      period_date
      month
     year

  } 
     total_monthly_last_twelve_disbursement {
      source
      sum
      month_long
      period_date
      month
     year

  } 
  }
`

// TotalDisbursements
const TotalDisbursements = props => {
  const { state: filterState } = useContext(DataFilterContext)
  const { monthly, period, breakoutBy } = filterState

  const chartTitle = props.chartTitle || `${ DFC.DISBURSEMENT } (dollars)`

  const { loading, error, data } = useQuery(TOTAL_DISBURSEMENTS_QUERY)
  if (loading) {
    return 'Loading...'
  }
  let chartData
  let xAxis = 'year'
  const yAxis = 'sum'
  const yGroupBy = breakoutBy || 'source'
  const units = 'dollars'
  let xLabels
  let maxFiscalYear
  let maxCalendarYear
  let xGroups = {}
  let disabledInput = false
  let legendHeaders

  if (error) return `Error! ${ error.message }`
  if (data) {
    // console.log('TotalDisbursements data: ', data)
    maxFiscalYear = data.total_monthly_fiscal_disbursement.reduce((prev, current) => {
      return (prev.year > current.year) ? prev.year : current.year
    })
    maxCalendarYear = data.total_monthly_calendar_disbursement.reduce((prev, current) => {
      return (prev.year > current.year) ? prev.year : current.year
    })

    if (monthly === DFC.MONTHLY_CAPITALIZED) {
      if (period === DFC.PERIOD_FISCAL_YEAR) {
        chartData = data.total_monthly_fiscal_disbursement
      }
      else if (period === DFC.PERIOD_CALENDAR_YEAR) {
        chartData = data.total_monthly_calendar_disbursement
      }
      else {
        chartData = data.total_monthly_last_twelve_disbursement
      }

      xGroups = chartData.reduce((g, row, i) => {
        const r = g
        const year = row.period_date.substring(0, 4)
        const months = g[year] || []
        months.push(row.month)
        r[year] = months
        return r
      }, {})

      xAxis = 'month_long'
      xLabels = (x, i) => {
        // console.debug(x)
        return x.map(v => v.substr(0, 3))
      }

      legendHeaders = (headers, row) => {
        const headerArr = [headers[0], '', `${ row.xLabel } ${ row.year }`]
        return headerArr
      }
    }
    else {
      disabledInput = true
      chartData = data.total_yearly_fiscal_disbursement
      xGroups['Fiscal Year'] = chartData.map((row, i) => row.year)
      xLabels = (x, i) => {
        return x.map(v => '\'' + v.toString().substr(2))
      }
    }
  }

  return (
    <>
      <SectionHeader
        title="Total disbursements"
        linkLabel="disbursements"
        showExploreLink
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionControls
            maxFiscalYear={maxFiscalYear}
            maxCalendarYear={maxCalendarYear}
            dataType={DFC.DISBURSEMENT}
          />
        </Grid>
        <Grid item xs>
          <StackedBarChart
            title={chartTitle}
            units={units}
            data={chartData}
            xAxis={xAxis}
            yAxis={yAxis}
            xGroups={xGroups}
            yGroupBy={yGroupBy}
            xLabels={xLabels}
            legendFormat={v => utils.formatToDollarInt(v)}
            legendHeaders={legendHeaders}
          />
          <Box fontStyle="italic" textAlign="right" fontSize="h6.fontSize">
            { (monthly === DFC.MONTHLY_CAPITALIZED)
              ? <Link href='/downloads/disbursements-by-month/'>Source file</Link>
              : <Link href='/downloads/disbursements/'>Source file</Link>
            }
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default TotalDisbursements
