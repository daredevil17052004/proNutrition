import React from 'react'
import { useState } from 'react'
import style from './style.module.css'
import foodData from './FoodData'


const FoodBox = (props) => {

    const [count,setCount] = useState(0);
    const [calo, setCalo] = useState(0);
    let [searching, setSearching] = useState('');
    let [selectedFood, setSelectedFood] = useState(null);

    const foods = props.food();
    console.log(foods[0].cal);
    

    function handleAdd(e,id){
        e.preventDefault();
        const selectedFood = foods.find((food)=> food.id === id);
        setSelectedFood(selectedFood)
        setCalo(selectedFood.cal * count )
        console.log(selectedFood);
    }
    
    function handleNumber(e){
        setCount(e.target.value);
        if(selectedFood){
            setCalo(selectedFood * e.target.value)
        }
    }

    function handleReset(e){
        e.preventDefault();
        setCount(0);
        setCalo(0)
        setSelectedFood(null)
    }

    function handleSearch(e){
        setSearching(e.target.value)
        setSelectedFood(null)
    }


  return (
    <div className={style.main}>
        <div className={style.search}>
            <h3>Search</h3>
            <input type="search" onChange={(e)=> handleSearch(e)} />
        </div>
        {
        foods.filter((val)=>{
            if(searching === ''){
                return val;
            }else if(val.name.toLowerCase().includes(searching.toLowerCase())){
                return val;
            }
        })
        .map((item,index)=>{
            return(
                <div>
                    <div className={style.container} key={index}>
                        <div className={style.cont}>
                            <div className={style.img}>
                                <img src={item.img}  />
                            </div>
                            <div>
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.cal}</p>  
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.input}>
                                <div>
                                    <input type="number" placeholder='Enter a number ' onChange={(e)=> handleNumber(e)} />
                                </div>
                                <div>
                                    <button onClick={(e)=>handleAdd(e,item.id)}>
                                        =
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                        <button className={style.reset} onClick={(e)=>handleReset(e)}>Reset</button>
                    </div>
                    <br />
                </div>
            )
        })
    }
     <div className={style.calTotal}>
        {selectedFood && count} {selectedFood && selectedFood.name} = {calo} calories
    </div>
    
    </div>
  )
}

export default FoodBox;