import './index.css'

const TravelItem = props => {
  const {details} = props
  const {name, description} = details
  const imageUrl = details.image_url

  return (
    <li className="card-container">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="headline">{name}</h1>
      <p className="para">{description}</p>
    </li>
  )
}

export default TravelItem
