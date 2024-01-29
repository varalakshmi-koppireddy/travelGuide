import {Component} from 'react'
import Loader from 'react-loader-spinner'

import PackageItem from './components/PackageItem'

import './App.css'

class App extends Component {
  state = {packagesList: [], isLoading: false}

  componentDidMount() {
    this.getPackages()
  }

  getPackages = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = await fetchedData.packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))

      this.setState({packagesList: updatedData, isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTavelPackagesList = () => {
    const {packagesList} = this.state

    return (
      <div className="bg-container">
        <h1 className="mainHeading">Travel Guide</h1>
        <ul className="list-container">
          {packagesList.map(each => (
            <PackageItem key={each.id} packageDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? this.renderLoadingView() : this.renderTavelPackagesList()
  }
}

export default App
