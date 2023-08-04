import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from '../TravelItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {apiStatus: apiStatusConstants.initial, travelData: []}

  componentDidMount() {
    this.getTheTravelDetails()
  }

  getTheTravelDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'

    const options = {
      method: 'GET',
    }

    const response = await fetch(travelGuidePackagesApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        travelData: data.packages,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <p>Failed to fetch the data</p>
    </div>
  )

  renderSuccessView = () => {
    const {travelData} = this.state

    return (
      <ul className="container">
        {travelData.map(each => (
          <TravelItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (true) {
      case apiStatus === apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatus === apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatus === apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <h1 className="head">Travel Guide</h1>
        {this.renderContent()}
      </div>
    )
  }
}

export default TravelGuide
