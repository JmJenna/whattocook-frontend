import React , {useEffect , useState} from 'react';
import getFoodRecipe from '../../api/FoodApi';
import {  Card , Container  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper , SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import './Random.css';

function Random(){

    const [random , setRandom ] = useState([]);

    useEffect(() => {
       async function getFoodAPI(){
        try{
            const check = localStorage.getItem('random');

            if(check){
                setRandom(JSON.parse(check))
            } else{
            const randomRecipe = await getFoodRecipe.getRecipe('random','limitLicense=true');
            setRandom(randomRecipe.recipes)
             }
        } catch(err){
            return err;
        }
       }
       getFoodAPI();
    },[])

    return(
        <div>
            <Container className="text-center py-4 px-4">
            <div className='randomTitle'>
            <h1> Pick any recipe from below</h1>
            </div>
            <div className='randomCard'> 
                <Swiper 
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                breakpoints={{
                    0:{
                        slidesPerView: 1,
                        spaceBetween:10
                    },
                    480:{
                        slidesPerView: 2,
                        spaceBetween:10
                    },
                    768:{
                        slidesPerView: 3,
                        spaceBetween:15
                    },
                    1024:{
                        slidesPerView: 4,
                        spaceBetween:15
                    },
                }}
                >
                {random.map(recipe => {
                    return(               
                        <SwiperSlide key={recipe.id} > 
                        <Link to={`/recipe/${recipe.id}`} style={{textDecoration:"none"}}>                                                
                        <Card style={{ width: '15rem' }} className='randomdetail justify-content-center'>
                        <Card.Img variant="top" src={recipe.image} />
                        <Card.Title stlye={{fontSize:"3rem"}} className='recipeTitle'>{recipe.title}</Card.Title> 
                        </Card> 
                        </Link>                       
                        </SwiperSlide>                
                    )
                    })}
                </Swiper>
                </div>   
            </Container>
        </div>
    )
}


export default Random;