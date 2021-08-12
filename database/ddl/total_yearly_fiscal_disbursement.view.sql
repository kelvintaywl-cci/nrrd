--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Debian 12.7-1.pgdg100+1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: total_yearly_fiscal_disbursement; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.total_yearly_fiscal_disbursement AS
( SELECT period.period,
    period.fiscal_year AS year,
    period.fiscal_month,
    period.month,
    period.month_long,
    location.land_type,
    fund.fund_type,
    fund.recipient,
        CASE
            WHEN ((fund.fund_class)::text = ANY (ARRAY[('Native American tribes and individuals'::character varying)::text, ('Land and Water Conservation Fund'::character varying)::text, ('Reclamation Fund'::character varying)::text, ('State and local governments'::character varying)::text, ('U.S. Treasury'::character varying)::text, ('Historic Preservation Fund'::character varying)::text])) THEN fund.fund_class
            ELSE 'Other funds'::character varying
        END AS fund_class,
        CASE
            WHEN ((location.land_type)::text = 'Native American'::text) THEN 2
            WHEN ((location.land_type)::text = 'Federal onshore'::text) THEN 4
            WHEN ((location.land_type)::text = 'Federal offshore'::text) THEN 3
            ELSE 0
        END AS sort_order,
    (sum((disbursement.disbursement)::double precision))::numeric(20,2) AS sum
   FROM ((((public.disbursement
     JOIN public.period USING (period_id))
     JOIN public.commodity USING (commodity_id))
     JOIN public.location USING (location_id))
     JOIN public.fund USING (fund_id))
  WHERE (((period.period)::text = 'Monthly'::text) AND (period.fiscal_year <= ( SELECT max(period_1.fiscal_year) AS max
           FROM (public.disbursement disbursement_1
             JOIN public.period period_1 USING (period_id))
          WHERE (period_1.fiscal_month = 1))))
  GROUP BY period.period, period.fiscal_year, period.fiscal_month, period.month, period.month_long, location.land_type, fund.fund_class, fund.fund_type, fund.recipient,
        CASE
            WHEN ((location.land_type)::text = 'Native American'::text) THEN 2
            WHEN ((location.land_type)::text = 'Federal onshore'::text) THEN 4
            WHEN ((location.land_type)::text = 'Federal offshore'::text) THEN 3
            ELSE 0
        END
  ORDER BY period.period, period.fiscal_year,
        CASE
            WHEN ((location.land_type)::text = 'Native American'::text) THEN 2
            WHEN ((location.land_type)::text = 'Federal onshore'::text) THEN 4
            WHEN ((location.land_type)::text = 'Federal offshore'::text) THEN 3
            ELSE 0
        END)
UNION
( SELECT period.period,
    period.fiscal_year AS year,
    period.fiscal_month,
    period.month,
    period.month_long,
    location.land_type,
    fund.fund_type,
    fund.recipient,
        CASE
            WHEN ((fund.fund_class)::text = ANY (ARRAY[('Native American tribes and individuals'::character varying)::text, ('Land and Water Conservation Fund'::character varying)::text, ('Reclamation Fund'::character varying)::text, ('State and local governments'::character varying)::text, ('U.S. Treasury'::character varying)::text, ('Historic Preservation Fund'::character varying)::text])) THEN fund.fund_class
            ELSE 'Other funds'::character varying
        END AS fund_class,
        CASE
            WHEN ((location.land_type)::text = 'Native American'::text) THEN 2
            WHEN ((location.land_type)::text = 'Federal onshore'::text) THEN 4
            WHEN ((location.land_type)::text = 'Federal offshore'::text) THEN 3
            ELSE 0
        END AS sort_order,
    (sum((disbursement.disbursement)::double precision))::numeric(20,2) AS sum
   FROM ((((public.disbursement
     JOIN public.period USING (period_id))
     JOIN public.commodity USING (commodity_id))
     JOIN public.location USING (location_id))
     JOIN public.fund USING (fund_id))
  WHERE (((period.period)::text = 'Fiscal Year'::text) AND (period.fiscal_year < ( SELECT min(period_1.fiscal_year) AS min
           FROM (public.disbursement disbursement_1
             JOIN public.period period_1 USING (period_id))
          WHERE (period_1.fiscal_month = 1))) AND (period.fiscal_year > ( SELECT (max(period_1.fiscal_year) - 11)
           FROM (public.disbursement disbursement_1
             JOIN public.period period_1 USING (period_id))
          WHERE (period_1.fiscal_month = 12))))
  GROUP BY period.period, period.fiscal_year, period.fiscal_month, period.month, period.month_long, location.land_type, fund.fund_class, fund.fund_type, fund.recipient,
        CASE
            WHEN ((location.land_type)::text = 'Native American'::text) THEN 2
            WHEN ((location.land_type)::text = 'Federal onshore'::text) THEN 4
            WHEN ((location.land_type)::text = 'Federal offshore'::text) THEN 3
            ELSE 0
        END
  ORDER BY period.period, period.fiscal_year,
        CASE
            WHEN ((location.land_type)::text = 'Native American'::text) THEN 2
            WHEN ((location.land_type)::text = 'Federal onshore'::text) THEN 4
            WHEN ((location.land_type)::text = 'Federal offshore'::text) THEN 3
            ELSE 0
        END);


ALTER TABLE public.total_yearly_fiscal_disbursement OWNER TO postgres;

--
-- PostgreSQL database dump complete
--

