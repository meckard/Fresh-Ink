import { useState } from "react"

export default function Registration() {

  const [isLoading, setIsLoading ] = useState(false)
  const [result, setResult] = useState('')
  const regForm = document.forms.regForm
  const formData = new FormData(regForm)
  console.log(Object.fromEntries(formData))

  const handleSubmit = (event, data) => {
    event.preventDefault()
    

    console.log(data) 
    setResult(data)
    console.log(result)
  }


  return (
    <div className="registration">
      <form id='regForm' onSubmit={handleSubmit}>
        <div className="inputs">
          <h2>Register Here</h2>
          <label for="email">Email</label>
          <input
            className="email"
            type="email"
            id="email"
            name="email"
            required
            minLength="5"
            maxLength="20"
            size="22"
          />
          <label for="password">Password</label>
          <input
            className="password"
            type="password"
            id="password"
            name="password"
            required
            minLength="5"
            maxLength="20"
            size="22"
          />
          <input type="submit" className="submit"/>
        </div>
      </form>
    </div>
  )
}
