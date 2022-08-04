import React, { useEffect, useState } from 'react'
import classes from './form.module.css'
import countryData from '../data/countries.json'
import stateData from '../data/states.json'
import cityData from '../data/cities.json'
import Tickmark from './tickmark'
import useForm from '../validation/useForm'

function Form() {
    const { data, handleChange, handleSubmit, errors, isSubmitting } = useForm();
    const [countryName, setCountryName] = useState("")
    const [stateName, setStateName] = useState("")
    const [cityName, setCityName] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [stateArr, setStateArr] = useState([])
    const [cityArr, setCityArr] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (data.country) {
            let countrysId = countryData.filter(x => x.country_name === data.country)[0].country_id;
            setStateArr(stateData.filter(x => x.country_id === countrysId))
        }
    }, [data])

    useEffect(() => {
        if (data.state) {
            let statesId = stateData.filter(x => x.state_name === data.state)[0].state_id;
            setCityArr(cityData.filter(x => x.state_id === statesId))
        }
    }, [data])

    useEffect(() => {
        console.log('errors', errors);
    }, [errors])


    return (
        <div>
            <form id="register" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input value={data.name} onChange={handleChange} className={classes.inputtext} type="text" name="name" placeholder='Name' />
                    <p>{errors.name && errors.name}</p>
                </div>
                <div>
                    <input value={data.email} onChange={handleChange} className={classes.inputtext} type="email" name="email" placeholder='Email' />
                    <p>{errors.email && errors.email}</p>

                </div>
                <div>
                    <input value={data.mobile} onChange={handleChange} className={classes.inputtext} type="text" name="mobile" placeholder='Mobile' />
                    <p>{errors.mobile && errors.mobile}</p>

                </div>
                <div>

                    <select onChange={handleChange/* e => setCountryName(e.target.value) */} className={classes.dropdown} name='country' value={data.country}>
                        <option>Select a country</option>

                        {countryData.map(countries => {
                            return (<option
                                key={countries?.country_id} value={countries?.country_name}>{countries?.country_name} </option>)
                        })}
                    </select>
                    <p>{errors.country && errors.country}</p>


                    <select onChange={handleChange/* e => setStateName(e.target.value) */} className={classes.dropdown} name='state' value={data.state}>
                        <option>Select a state</option>
                        {stateArr.map(states => {
                            return (<option key={states?.state_id} value={states?.state_name}>{states?.state_name} </option>)
                        })}
                    </select>
                    <p>{errors.state && errors.state}</p>


                    <select onChange={handleChange/* (e) => setCityName(e.target.value) */} className={classes.dropdown} name='city' value={data.city}>
                        <option>Select a city</option>
                        {cityArr.map(city => {
                            return (<option key={city?.city_id} value={city?.city_name}>{city?.city_name} </option>)
                        })}
                    </select>
                    <p>{errors.city && errors.city}</p>


                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <textarea value={data.message} onChange={handleChange} name='message' className={classes.inputtext} placeholder='Type something...' />
                </div>
                <p>{errors.message && errors.message}</p>

                {(!isSubmitting || Object.keys(errors).length != 0) && <input type="submit" value="Submit" />}
                {(isSubmitting && Object.keys(errors).length === 0) && <Tickmark />}
                {(isSubmitting && Object.keys(errors).length === 0) && <p>Form submitted successfully !</p>}
            </form>
        </div>
    )
}

export default Form