import React from 'react';
import Random from './Random'
import Category from './Category'
import SearchForm from '../common/SearchForm'

function Home(){
    return(
        <div>
                <SearchForm />
                <Category />
                <Random />    
        </div>
        
    )
}

export default Home;