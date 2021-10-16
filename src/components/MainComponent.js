import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetailComponent from './DishDetailComponent';
import {DISHES} from '../dishes';
import {LEADERS} from '../leaders';
import {PROMOTIONS} from '../promotions';
import {COMMENTS} from '../comments';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from "react-router-dom";
import Home from './HomeComponent';
import Contact from "./ContactComponent.js";
import About from "./AboutComponent.js";
class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
    };
  }


  render() {
    const HomePage=()=>{
      return(
        <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        promotion={this.state.promotions.filter(p => p.featured)[0]}
        leader={this.state.leaders.filter(l => l.featured)[0]}
        />
      )
    }
    return (
        <div>
            <Header/>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/aboutus" component={About}/>
                <Route path="/contactus" component={Contact}/>
                <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />}/> 
                <Redirect to="/home"/>
            </Switch>
            <Footer/>
        </div>
    );
  }
}

export default Main;