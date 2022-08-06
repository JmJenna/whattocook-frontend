import React , {useState , useEffect, useContext } from 'react';
import UserApi from '../../api/Api';
import UserContext from '../auth/UserContext';
import {  Card , Row , Container } from 'react-bootstrap';
import { Link  } from "react-router-dom";
import { BiMessageAltDetail } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

function MyRecipe(){
    const [ recipe , setRecipe ] = useState([]);
    const [ deleteRecipce , setDeleteRecipe] = useState([]);
    const { currentUser } = useContext(UserContext);

    useEffect(()=>{
        async function getRecipe(){
           const findRecipes = await UserApi.getRecipes(currentUser.username);
           setRecipe(findRecipes.recipes);
        }
        getRecipe();  
    },[deleteRecipce])
     
    
    async function handleRemove(id) {
        setDeleteRecipe(await UserApi.deleteRecipes(id)); 
      }
    

    return(
        <div>
            <div className="recipe-container">
            <Container  className="text-center">
            <h1 className='cuisineName'>{currentUser.username.toUpperCase()}'s Recipes </h1>
           <Row xs={1} md={2} lg={3} className="justify-content-center">           
            {recipe.map((item)=>{
                return(                    
                    <Card style={{ width: '18rem' }} className="recipeContainer text-center" key={item.id}>
                       <Link to={`/recipe/${item.title_id}`} className='recipe'>
                      <Card.Img variant="top" src={item.img_url} />
                      <Card.Title className='recipeTitle'>{item.title}</Card.Title> 
                      </Link>
                      <div style={{margin:"1.5rem"}}>
                        <Link to={`/recipe/${item.title_id}`} style={{color:"#ff6347" , fontSize:"2rem", marginRight:"1rem"}}>   
                          <BiMessageAltDetail />
                        </Link>        
                        <button style={{ backgroundColor:"transparent", color:"gray" , fontSize:"2rem" , border:"none", marginLeft:"1rem"}} 
                         onClick={() => handleRemove(item.id)}>
                            <AiOutlineDelete /> </button>                           
                     </div>                
                    </Card>                    
                )
            })}
            </Row>
            </Container>
            </div>
        </div>
    )
}


export default MyRecipe;