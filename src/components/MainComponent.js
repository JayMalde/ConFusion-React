import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetailComponent from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect,withRouter} from "react-router-dom";
import Home from './HomeComponent';
import Contact from "./ContactComponent.js";
import About from "./AboutComponent.js";
import {connect} from "react-redux";
import { addComment,fetchDishes,fetchComments,fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    leaders:state.leaders,
    comments:state.comments,
    promotions:state.promotions
  }
}

const mapDispatchToProps=(dispatch)=>({
  addComment:(dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm: ()=>{dispatch(actions.reset('feedback'))},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())},

});
class Main extends Component {
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  render() {
    const HomePage=()=>{
        return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMessage={this.props.dishes.errMessage}
        promotion={this.props.promotions.promotions.filter(p => p.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMessage={this.props.promotions.errMessage}
        leader={this.props.leaders.filter(l => l.featured)[0]}
        />
      )
    }
    const DishWithId=({match})=>{
      return(
        <DishDetailComponent dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMessage={this.props.dishes.errMessage}
        comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMessage={this.props.comments.errMessage}
        addComment={this.props.addComment}
        />
      );
    }
    return (
        <div>
            <Header/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                <Route path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />}/> 
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Redirect to="/home"/>
            </Switch>
            <Footer/>
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));