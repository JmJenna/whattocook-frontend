import React , {useEffect , useState} from 'react';
import { Link , useParams } from "react-router-dom";
import getFoodRecipe from '../../api/FoodApi';
import {  Card , Row , Container } from 'react-bootstrap';
import './Cuisine.css';

function Cuisine(){
    let params = useParams();
    const [cuisine , setCuisine] = useState([]);

    useEffect(() => {
        async function getFoodAPI(name){
         try{             
            const check = localStorage.getItem('complexSearch');

            if(check){
                setCuisine(JSON.parse(check))
             } else{
             const cusineRec = await getFoodRecipe.getRecipe('complexSearch',`cuisine=${name}`);
             setCuisine(cusineRec.results)
              }
         } catch(err){
             return err;
         }
        }
        getFoodAPI(params.type);

     },[params.type])



    return(
        <div>
            <Container className="text-center">
            <h1 className='cuisineName'>{params.type.toUpperCase()} FOOD </h1>
           <Row xs={1} md={2} lg={3} className="justify-content-center">           
            {cuisine.map((item)=>{
                return(
                    <Link to={`/recipe/${item.id}`} className='recipe'>
                    <Card style={{ width: '18rem' }} className="recipeContainer text-center">
                     <Card.Img variant="top" src={item.image} />
                      <Card.Title className='recipeTitle'>{item.title}</Card.Title> 
                    </Card>
                    </Link>
                )
            })}
            </Row>
            </Container>
        </div>
    )
}

export default Cuisine;