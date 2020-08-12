const TransactionReducer=((state,action)=>{
    switch(action.type) {
        case "ADD": {

            return [action.payload,...state]
        }
        case "DELETE": {
            return state.filter((transObj)=>{
                return action.payload.id!==transObj.id;
            })
        }
        case "UPDATE": {
            for(let trans of state) {
                if(trans.id===action.payload.id) {
                    trans.desc=action.payload.desc;
                    trans.amount=action.payload.amount;
                    let array=state.filter((trans)=>{
                        return action.payload.id!==trans.id;
                    });
                    if(array===[]) {
                        return [trans];
                    } 
                    else {
                        return [trans,...array];
                    }
                }
            }
            return state;
        }
        case "CLEAR": {
            return [];
        }
        default:
            return state;
    }
})
export default TransactionReducer;