
export function handleSalvar(state, setStateFunction){
    if(state){
        setStateFunction(false)
    }else{
        setStateFunction(true)
    }
}