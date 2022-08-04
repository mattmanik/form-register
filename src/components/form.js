import React, { useEffect, useState } from 'react'
import classes from './form.module.css'
import countryData from '../data/countries.json'
import stateData from '../data/states.json'
import cityData from '../data/cities.json'
import Tickmark from './tickmark'
import validate from '../validation/validation'
import useForm from '../validation/useForm'

function Form() {
    const { data, handleChange, handleSubmit,errors } = useForm(validate);
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
        if (countryName) {
            let countrysId = countryData.filter(x => x.country_name === countryName)[0].country_id;
            setStateArr(stateData.filter(x => x.country_id === countrysId))
        }
    }, [countryName])

    useEffect(() => {
        if (stateName) {
            let statesId = stateData.filter(x => x.state_name === stateName)[0].state_id;
            setCityArr(cityData.filter(x => x.state_id === statesId))
        }
    }, [stateName])

    useEffect(() => {
     console.log('errors',errors);
    }, [errors])
    

    return (
        <div>
            <form id="register" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={classes.inputtext} type="text" name="name" placeholder='Name' />
                </div>
                <div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className={classes.inputtext} type="email" name="email" placeholder='Email' />
                </div>
                <div>
                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} className={classes.inputtext} type="text" name="mobile" placeholder='Mobile' />
                </div>
                <div>

                    <select onChange={e => setCountryName(e.target.value)} className={classes.dropdown} name='country' value={countryName}>
                        <option>Select a country</option>

                        {countryData.map(countries => {
                            return (<option
                                key={countries?.country_id} value={countries?.country_name}>{countries?.country_name} </option>)
                        })}
                    </select>

                    <select onChange={e => setStateName(e.target.value)} className={classes.dropdown} name='state' value={stateName}>
                        <option>Select a state</option>
                        {stateArr.map(states => {
                            return (<option key={states?.state_id} value={states?.state_name}>{states?.state_name} </option>)
                        })}
                    </select>

                    <select onChange={(e) => setCityName(e.target.value)} className={classes.dropdown} name='city' value={cityName}>
                        <option>Select a city</option>
                        {cityArr.map(city => {
                            return (<option key={city?.city_id} value={city?.city_name}>{city?.city_name} </option>)
                        })}
                    </select>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <textarea onChange={(e) => setMessage(e.target.value)} className={classes.inputtext} placeholder='Type something...' />
                </div>
                <input type="submit" value="Submit" />
                <Tickmark />

            </form>
        </div>
    )
}

export default Form