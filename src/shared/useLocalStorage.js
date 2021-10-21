import { useState } from "react";

export function useLocalStorage(key , initialState){
    const [state,setState]=useState(loadInitialState);

    function getInitial(){
        if(initialState instanceof Function){
            return initialState();
        }
        
        return initialState;
    }

    function loadInitialState(){
        let storedValue=localStorage.getItem(key);
        if(storedValue){
            storedValue=JSON.parse(storedValue);
        }else{
            storedValue=getInitial();
        }
        return storedValue;
    }

    function setLocalStorage(value){
        localStorage.setItem(key,JSON.stringify(value));
        setState(value);
    }

    function deleteState(){
        localStorage.removeItem(key);
        setState(getInitial());
    }

    return  [state , setLocalStorage , deleteState];
}