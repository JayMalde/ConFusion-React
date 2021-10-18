import {DISHES} from '../dishes';
import {LEADERS} from '../leaders';
import {PROMOTIONS} from '../promotions';
import {COMMENTS} from '../comments';

export const initialState={
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS,
}

export const Reducer=(state=initialState,action)=>{
    return state;
}