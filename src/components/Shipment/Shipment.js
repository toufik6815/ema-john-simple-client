import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = (data) => {
      const savedCart = getDatabaseCart();
      const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

      fetch("https://blooming-refuge-80139.herokuapp.com/addOrder", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          processOrder();
          alert('your order was successfully')
        }
      })
    };
    console.log(watch("example"));

  return (
    <form className="ship_form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder="Enter Your Name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        name="email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="Enter Your Email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        name="phone"
        ref={register({ required: true })}
        placeholder="Enter Your Phone Number"
      />
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Enter Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        name="city"
        ref={register({ required: true })}
        placeholder="Enter Your City Name"
      />
      {errors.address && <span className="error">City Name is required</span>}

      <input
        name="country"
        ref={register({ required: true })}
        placeholder="Enter Your Country Name"
      />
      {errors.address && (
        <span className="error">Country Name is required</span>
      )}

      <input
        name="zipCode"
        ref={register({ required: true })}
        placeholder="Enter Your Zip Code"
      />
      {errors.address && <span className="error">Zip Code is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;