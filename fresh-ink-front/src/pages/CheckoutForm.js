export default function CheckoutForm() {
  const checkoutForm = document.forms.checkoutForm
  console.log(checkoutForm)
  const formData = new FormData(checkoutForm)
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData.get("lastname"))
    console.log(Object.fromEntries(formData))
    try {
      const response = await fetch('https://localhost:3003/orders/new_order', {
        method: 'POST', // POST request
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convert data to JSON string
      })

      const result = await response // Parse JSON response from server
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="checkout-form">
      <form id="checkoutForm" onSubmit={handleSubmit}>
        <div className="inputs">
          <h1>Let's get that info</h1>
          <div className="email-name">
            <div className="checkout-input email-input">
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
            </div>
            <div className="checkout-input">
              <label for="firstname">First Name</label>
              <input
                className="first-name"
                type="text"
                id="first-name"
                name="first name"
                required
                minLength="5"
                maxLength="20"
                size="22"
              />
            </div>
            <div className="checkout-input">
              <label for="lastname">Last Name</label>
              <input
                className="last-name"
                type="text"
                id="last-name"
                name="lastname"
                required
                minLength="5"
                maxLength="20"
                size="22"
              />
            </div>
          </div>
          <div className="address-info">
            <div className="checkout-input">
              <label for="streetaddress">Street Address</label>
              <input
                className="street-address"
                type="text"
                id="street-address"
                name="streetaddress"
                required
                minLength="5"
                maxLength="20"
                size="22"
              />
            </div>
            <div className="checkout-input">
              <label for="city">City</label>
              <input
                className="city"
                type="text"
                id="city"
                name="city"
                required
                minLength="5"
                maxLength="20"
                size="22"
              />
            </div>
            <div className="checkout-input">
              <label for="state">State</label>
              <input
                className="state"
                type="text"
                id="state"
                name="state"
                required
                minLength="2"
                maxLength="2"
                size="22"
              />
            </div>
            <div className="checkout-input">
              <label for="zipcode">Zipcode</label>
              <input
                className="zipcode"
                type="number"
                id="zipcode"
                name="zipcode"
                required
                minLength="5"
                maxLength="5"
                size="22"
              />
            </div>
          </div>
          <input
            type="submit"
            className="submit-input"
            value="Just take my money"
          />
        </div>
      </form>
    </div>
  )
}
