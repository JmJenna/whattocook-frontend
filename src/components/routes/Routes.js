import React from 'react';
import {Switch, Route, Redirect } from "react-router-dom";
import PrivacyRoute from './PrivacyRoute';

import Home from '../page/Home'
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import Cuisine from '../page/Cuisine';
import Search from '../page/Search';
import Recipe from '../page/Recipe';
import MyRecipe from '../page/MyRecipe';
import ProfileForm from '../auth/ProfileForm';

function Routes({login, signup}){
        return(
            <div>
                 <Switch>

                    <Route exact path="/">
                    <Home />
                    </Route>

                    <Route exact path="/login">
                      <Login login={login}/>
                    </Route>

                    <Route exact path="/signup">
                      <Signup signup={signup}/>
                    </Route>

                    <PrivacyRoute exact path="/cuisine/:type">
                      <Cuisine />
                    </PrivacyRoute>

                    <PrivacyRoute exact path="/search/:search">
                      <Search />
                    </PrivacyRoute>

                    <PrivacyRoute exact path="/recipe/:detail">
                      <Recipe />
                    </PrivacyRoute>

                    <PrivacyRoute exact path="/myrecipe">
                      <MyRecipe />
                    </PrivacyRoute>

                    <PrivacyRoute exact path="/profile">
                      <ProfileForm />
                    </PrivacyRoute>

                    <Redirect to="/" />

                 </Switch>
            </div>
        )
}

export default Routes;