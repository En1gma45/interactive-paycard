import React, { useState } from 'react'
import '../assets/CardComponent.css'
import chip from '../assets/images/chip.png'

const CARD_MASK = '*'

const Select_items = (initial, value, cardValue) => {
    let items = []
    if(cardValue){
        let numbers = [...cardValue]
        let counter = 0
        for (let i = 1; i <= numbers.length+3; i++) {
            if(i%5===0 &&i!==0){
                items.push(<span key={`${i}`}>{' '}</span>)
            }
            else{
                items.push(<span key={`${i}`}>{numbers[counter]}</span>)
                counter++
            }
        }
    }
    else{
        for (let i = initial; i < value+1; i++) {
            items.push(<option key={`${i}`} value={`${i}`}>{i}</option>)
        }
    }
    return items
}

const CardChanger = (e, cardValue, setCardValue, mask) => {

    let currentValue = [...cardValue]
    for (let i = 0; i < [...e.target.value].length; i++) {
        if(e.target.id === 'card__number') {
            if(i<4 || i>11) currentValue[i] = [...e.target.value][i]
            else currentValue[i] = mask
        }
        else if(e.target.id === 'card__cvv'){
            currentValue[i] = mask
        }
        else currentValue[i] = [...e.target.value][i]
    }
    console.log();
    
    return setCardValue(currentValue)
}

const ElementIsFocused = (e) =>{
    document.getElementById(`label__${e.target.id}`).classList.toggle("active")
}

const Rotate = ()=> {
    let el = document.getElementsByClassName('card__container')
    el[0].classList.toggle("rotate")
}

const CardComponent = () => {

    const[date] = useState(new Date().getFullYear())
    const[cardNumber, setCardNumber] = useState('################')
    const[cardName, setCardName] = useState('Card Holder')
    const[cardCvv, setCardCvv] = useState(' ')
    const[cardMonth, setMonth] = useState('MM')
    const[cardYear, setYear] = useState('YY')

    return (
        <div className="card__form">
            <div className="card__container">
                <div className="card__number">
                    <img src={chip} alt='chip'></img>
                    <label id="label__card__number">{Select_items(null, null, cardNumber)}</label>
                </div>
                <div className="card__row">
                    <div className="card__holder" id="label__card__holder">
                        <p>Card Holder</p>
                        <p defaultValue="Card Holder">{cardName}</p>
                    </div>
                    <div className="card__time__expires" id="label__card__date">
                        <p>Expires</p>
                        <p><span id="label__card__month">{cardMonth}</span>/<span id="label__card__year">{cardYear}</span></p>
                    </div>
                </div>
                <div className="card__cvv" id="label__card__cvv">{cardCvv}</div>
            </div>
            <div className="card__fields">
                <div className="field__title">
                    <label htmlFor="card__number">Card Number</label>
                    <input type="text" className="field__number" id="card__number" name="card__number" maxLength="16" onChange={(e)=>CardChanger(e, cardNumber, setCardNumber, CARD_MASK)} onFocus={ElementIsFocused} onBlur={ElementIsFocused}/>
                </div>
                <div className="field__title"> 
                    <label htmlFor="card__holder">Card Holder</label>
                    <input type="text" className="field__holder" id="card__holder" name="card__holder" onChange={(e)=>CardChanger(e, '', setCardName)} onFocus={ElementIsFocused} onBlur={ElementIsFocused}/>
                </div>
                <div className="row">
                    <div className="dropdown">
                        <label className="row__title">Expiration Date</label>
                        <div className="row__selector" onFocus={ElementIsFocused} onBlur={ElementIsFocused}>
                            <select name="month" id="card__date" className="selector" defaultValue="Month" onChange={(e)=>setMonth(e.target.value)}>
                                <option value="Month" disabled >Month</option>
                                {Select_items(1, 12)}
                            </select>
                            <select name="year" id="card__date" className="selector" defaultValue="Year" onChange={(e)=>setYear(e.target.value)}>
                            <option value="Year" disabled >Year</option>
                                {Select_items(date, date+10)}
                            </select>
                        </div>
                    </div>
                    <div className="field__title">
                        <label htmlFor="cvv">CVV</label>
                        <input type="password" className="field__cvv" name="cvv" id="card__cvv" maxLength='4' onChange={(e)=>CardChanger(e, '', setCardCvv, CARD_MASK)} onFocus={Rotate} onBlur={Rotate}/>
                    </div>
                </div>
                <button className="card__button">Submit</button>
            </div>
        </div>
    )
}


export default CardComponent
