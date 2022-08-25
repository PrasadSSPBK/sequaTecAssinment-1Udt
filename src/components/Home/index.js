import './index.css'

const Home = props => {
  const {loginEmail} = props
  const storedEmail = localStorage.getItem(`${loginEmail}`)
//   console.log(loginEmail)
//   console.log(storedEmail)
  return (
    <div className="homeContainer">
      <h1 className="head"> Hello {storedEmail} </h1>
    </div>
  )
}

export default Home
