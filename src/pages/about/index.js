import React from "react"
import { Link } from "gatsby"

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import DefaultLayout from "../../components/layouts/DefaultLayout"
import SEO from "../../components/seo"

import { GlossaryTerm } from '../../components/utils/GlossaryTerm'
import DOImark from '../../img/logos/DOI-mark.png'
import BLMmark from '../../img/logos/BLM-mark.png'
import OSMREmark from '../../img/logos/OSMRE-mark.png'
import BOEMmark from '../../img/logos/BOEM-mark.png'
import BSEEmark from '../../img/logos/BSEE-mark.png'
import ONRRmark from '../../img/logos/ONRR-mark.svg'
import DoTmark from '../../img/logos/DoT-mark.png'
import IRSmark from '../../img/logos/IRS-mark.svg'

const useStyles = makeStyles(theme => ({
  root: {},
  fluid: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  },
  pageSectionTop: {
    background: '#f0f6fa',

  },
  heroGridLeft: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  heroGridRight: {
    padding: theme.spacing(3)
  },
  heroTitle: {
    fontSize: '2.125rem',
    marginBottom: theme.spacing(2)
  }
}))


const AboutPage = () => {
  const classes = useStyles()

  return (
    <DefaultLayout>
    <SEO
      title="About | Natural Resources Revenue Data"
      meta={[
        // title
        { name: 'og:title', content: 'About | Natural Resources Revenue Data' },
        { name: 'twitter:title', content: 'About | Natural Resources Revenue Data' },
      ]} />
    <main id="main-content">
      <Container className={classes.pageSectionTop} maxWidth={false}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={8} className={classes.heroGridLeft}>
              <Typography variant="h1" className={classes.heroTitle}>About this site</Typography>
              <Typography variant="body1">
                The United States is a major developer of natural resources. The Department of the Interior (DOI) collects billions of dollars in annual revenue from companies that lease <GlossaryTerm termKey="federal land">federal lands and waters</GlossaryTerm> in order to develop oil, gas, or mineral resources. These revenues are <Link to="/explore/#federal-disbursements">disbursed</Link> to the U.S. Treasury, other federal agencies, states, Native American tribes, and individual Native American mineral owners.
              </Typography>
              <Typography variant="body1">
                This site provides data and contextual information about how natural resources and their revenues are managed in the U.S.
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.heroGridRight}>
              <Typography variant="h4">
                Understand natural resource management on federal land
              </Typography>
              <ul className="list-bullet ribbon-card-top-list">
                <li><Link to="/how-it-works/ownership/">Land ownership</Link></li>
                <li><Link to="/how-it-works/#laws">Laws and regulations</Link></li>
                <li><Link to="/how-it-works/#process">Oil, gas, minerals, and renewable energy</Link></li>
                <li><Link to="/how-it-works/audits-and-assurances/">Audits and assurances</Link></li>
              </ul>
              <Link to="/how-it-works/" className="button-primary">
                <Button variant="contained" color="primary" className={classes.button}>
                  How it works
                </Button>
              </Link>
              

            </Grid>
          </Grid>
        </Container>
      </Container>
    </main>
    
    <Container maxWidth="lg">
      <main id="main-content">

        <div className="container-page-wrapper container-margin-separation communities">

          <div className="communities-intro">

            <section className="container">

              <div className="container-left-7">
                <h2 id="whos-involved">Who’s involved</h2>

                <p>Congress passes laws to govern the extraction of natural resources and the fiscal management of resulting revenue. Federal agencies develop regulations and rules to implement and enforce those laws. DOI has primary responsibility for implementing the relevant statutes and regulations in consultation with other federal agencies.</p>
              </div>

            </section>

          </div>

          <section className="container communities-content">

            <article className="container-left-7 bureaus">

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={DOImark} alt="U.S. Department of the Interior Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Department of the Interior (DOI)</h4>
                  <p><a href="https://www.doi.gov/">DOI</a> protects and manages the nation’s natural resources and cultural heritage; provides scientific and other information about those resources; and honors its trust responsibilities or special commitments to Native Americans, Alaska Natives, and affiliated island communities.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={BLMmark} alt="U.S. Department of the Interior Bureau of Land Management Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Bureau of Land Management (BLM)</h4>
                  <p><a href="http://www.blm.gov/">BLM</a> manages exploration, development, and production of natural resources on federal lands, including lease sales and the permitting and licensing processes. BLM also ensures that developers and operators comply with requirements and regulations. BLM collects revenue in the form of <GlossaryTerm>bonus</GlossaryTerm> bids, first year rentals, and fees.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={OSMREmark} alt="U.S. Department of the Interior Office of Surface Mining Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Office of Surface Mining Reclamation and Enforcement (OSMRE)</h4>
                  <p><a href="http://www.osmre.gov/">OSMRE</a> implements requirements of the Surface Mining Control and <GlossaryTerm>Reclamation</GlossaryTerm> Act by working with states and tribes to ensure that citizens and the environment are protected during coal mining and that land is restored to beneficial use when mining is finished. OSMRE and its partners are also responsible for the <Link to="/how-it-works/aml-reclamation-program/">Abandoned Mine Land reclamation program</Link>, which aims to reclaim and restore lands and waters degraded by mining operations before 1977.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={BOEMmark} alt="BOEM Bureau of Ocean Energy Management Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Bureau of Ocean Energy Management (BOEM)</h4>
                  <p><a href="http://www.boem.gov/">BOEM</a> manages responsible ocean energy development in federal submerged lands, including leasing, plan administration, environmental analysis, resource evaluation, economic analysis, and the renewable energy program. BOEM also updates <a href="http://www.boem.gov/National-Environmental-Policy-Act/">leasing regulations for the Outer Continental Shelf</a>.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={BSEEmark} alt="BSEE Bureau of Safety and Environmental Enforcement Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Bureau of Safety and Environmental Enforcement (BSEE)</h4>
                  <p><a href="http://www.bsee.gov/">BSEE</a> is responsible for safety oversight of ocean energy development and production, including permitting and inspections, regulatory programs, and oil spill response. BSEE also updates rules governing operations on the <GlossaryTerm>Outer Continental Shelf</GlossaryTerm>.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={ONRRmark} alt="Office of Natural Resources Revenue" />
                </div>
                <div className="bureau-right">
                  <h4>Office of Natural Resources Revenue (ONRR)</h4>
                  <p><a href="http://www.onrr.gov/">ONRR</a> collects, accounts for, and verifies revenues from natural resource extraction on federal and Native American land for the benefit of all Americans. ONRR collects revenue from energy and mineral leases for both onshore and offshore federal and Native American lands and disburses revenues to states, Native Americans, and the U.S. Treasury.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={DoTmark} alt="U.S. Department of the Treasury Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Department of the Treasury</h4>
                  <p><a href="http://www.treasury.gov/Pages/default.aspx">The Treasury</a> supports economic growth and stability in the U.S. and overseas, protects the U.S. financial system, and manages the federal government’s finances and resources.</p>
                </div>
              </article>

              <article className="bureau">
                <div className="bureau-left">
                  <img className="bureau-image" src={IRSmark} alt="Internal Revenue Service Seal" />
                </div>
                <div className="bureau-right">
                  <h4>Internal Revenue Service (IRS)</h4>
                  <p><a href="https://www.irs.gov/">The IRS</a> collects corporate income taxes from corporations in the extractive industries, as well as income taxes from all other companies operating in these industries.</p>
                </div>
              </article>

            </article>

          </section>

          <section className="container">

            <div className="container-left-7">
              <h2 id="history">History</h2>
              <p>This site was originally built to support the United States' participation in the <a href="https://eiti.org/">Extractive Industries Transparency Initiative (EITI)</a>, which the U.S. joined in 2011.</p>

              <p>In November 2017, the U.S. decided to no longer formally implement the <GlossaryTerm>EITI Standard</GlossaryTerm>, but remains a strong supporter of good governance and the principles of transparency represented by the EITI.</p>

              <p><Link to="/archive">Learn more about the history of this site and review the archive.</Link></p>

            </div>
          </section>

        </div>
      </main> 
    </Container>
  </DefaultLayout>
  )
}
  


export default AboutPage