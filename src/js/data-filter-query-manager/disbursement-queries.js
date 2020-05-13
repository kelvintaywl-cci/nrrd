import gql from 'graphql-tag'
import {
  RECIPIENT,
  SOURCE,
  OFFSHORE_REGION,
  US_STATE,
  PERIOD,
  FISCAL_YEAR,
  CALENDAR_YEAR,
  COMMODITY
} from '../../constants'

/**
 * The file contains all queries related to revenue data filters.
 * Please note to alias the option queries with 'options' and 'option' since this is
 * used to retrieve that data for the components
 */

const GRAPHQL_VIEW = 'data_filter_disbursements_options'

const VARIABLE_LIST = ''.concat(
  '$recipient: String,',
  '$offshoreRegion: [String!],',
  '$usState: [String!],',
  '$county: [String!],',
  '$commodity: [String!],',
  '$period: String,',
  '$fiscalYear: [Int!],',
  '$calendarYear: [Int!],'
)

const RECIPIENT_OPTIONS_QUERY = `
  options:${ GRAPHQL_VIEW }(
    where: {
      state: {_in: $usState},
      fund_type: {_neq: ""},
      offshore_region: {_in: $offshoreRegion},
      county: {_in: $county},
      period: {_eq: $period},
      fiscal_year: {_in: $fiscalYear},
      calendar_year: {_in: $calendarYear}
    },
    distinct_on: fund_type,
    order_by: {fund_type: asc}
  ) {
    option:fund_type
  }`

const US_STATE_OPTIONS_QUERY = `
  options:${ GRAPHQL_VIEW }(
    where: {
      state: {_neq: ""},
      fund_type: {_eq: $recipient},
      offshore_region: {_in: $offshoreRegion},
      county: {_in: $county},
      period: {_eq: $period},
      fiscal_year: {_in: $fiscalYear},
      calendar_year: {_in: $calendarYear}
    },
    distinct_on: state,
    order_by: {state: asc}
  ) {
    option:state
  }`

const OFFSHORE_REGION_OPTIONS_QUERY = `
  options:${ GRAPHQL_VIEW }(
    where: {
      fund_type: {_eq: $recipient},
      state: {_in: $usState},
      county: {_in: $county},
      period: {_eq: $period},
      offshore_region: {_neq: ""},
      fiscal_year: {_in: $fiscalYear},
      calendar_year: {_in: $calendarYear}
    },
    distinct_on: offshore_region,
    order_by: {offshore_region: asc}
  ) {
    option:offshore_region
  }`

const FISCAL_YEAR_OPTIONS_QUERY = `
  options:${ GRAPHQL_VIEW }(
    where: {
      fund_type: {_eq: $recipient},
      offshore_region: {_in: $offshoreRegion},
      state: {_in: $usState},
      county: {_in: $county},
      period: {_eq: $period},
      fiscal_year: {_neq: 0}
    },
    distinct_on: fiscal_year,
    order_by: {fiscal_year: asc}
  ) {
    option:fiscal_year
  }`

const CALENDAR_YEAR_OPTIONS_QUERY = `
  options:${ GRAPHQL_VIEW }(
    where: {
      fund_type: {_eq: $recipient},
      offshore_region: {_in: $offshoreRegion},
      state: {_in: $usState},
      county: {_in: $county},
      period: {_eq: $period},
      calendar_year: {_neq: 0}
    },
    distinct_on: calendar_year,
    order_by: {calendar_year: asc}
  ) {
    option:calendar_year
  }`

const PERIOD_OPTIONS_QUERY = `
  options:${ GRAPHQL_VIEW }(
    where: {
      fund_type: {_eq: $recipient},
      offshore_region: {_in: $offshoreRegion},
      state: {_in: $usState},
      county: {_in: $county},
    },
    distinct_on: period,
    order_by: {period: asc}
  ) {
    option:period
  }`

const DISBURSEMENT_QUERIES = {
  [US_STATE]: gql`query GetUsStateOptionsProduction(${ VARIABLE_LIST }){${ US_STATE_OPTIONS_QUERY }}`,
  [OFFSHORE_REGION]: gql`query GetOffshoreRegionOptionsProduction(${ VARIABLE_LIST }){${ OFFSHORE_REGION_OPTIONS_QUERY }}`,
  [RECIPIENT]: gql`query GetCommodityOptionsProduction(${ VARIABLE_LIST }){${ RECIPIENT_OPTIONS_QUERY }}`,
  [FISCAL_YEAR]: gql`query GetFiscalYearOptionsProduction(${ VARIABLE_LIST }){${ FISCAL_YEAR_OPTIONS_QUERY }}`,
  [CALENDAR_YEAR]: gql`query GetCalendarYearOptionsProduction(${ VARIABLE_LIST }){${ CALENDAR_YEAR_OPTIONS_QUERY }}`,
  [PERIOD]: gql`query GetPeriodOptionsProduction(${ VARIABLE_LIST }){${ PERIOD_OPTIONS_QUERY }}`
}

export default DISBURSEMENT_QUERIES
