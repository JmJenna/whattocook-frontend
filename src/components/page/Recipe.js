import React , { useEffect , useState , useContext} from 'react';
import getFoodRecipe from '../../api/FoodApi';
import UserContext from "../auth/UserContext";
import { useParams  } from 'react-router-dom';
import { Button, Container, Image , Row , Card} from 'react-bootstrap';
import { MdOutlineSaveAlt } from "react-icons/md";
import './Recipe.css';

function Recipe(){
    const params = useParams();

    const [recipeDetail, setRecipeDetail ] = useState({});
    const [activeBtn , setActiveBtn ] = useState("instructions");    
    const { currentUser, makeRecipe } = useContext(UserContext);
    
    const [ addRecipe , setAddRecipe] = useState({
        title_id: recipeDetail.id,
        title:"",
        img_url:"",
        username: currentUser.username
    })
    
    useEffect(()=>{
        async function recipeRes(ResId){
            const detailResults = await getFoodRecipe.getDetail(ResId);
            setRecipeDetail(detailResults)
        }
        recipeRes(params.detail)
    },[params.detail])
    console.log('setAct', activeBtn);


    async function handleSubmit(e) {
        e.preventDefault();
       const saveArecipe = await makeRecipe({
            title_id : recipeDetail.id,
            title : recipeDetail.title , 
            img_url : recipeDetail.image,
            username: currentUser.username
        });
        setAddRecipe(saveArecipe)        
      }

    return(
        <div>
            <Container className="text-center">
            <form onSubmit={handleSubmit}>
                <button style={{margin:'2rem'}} className='btn btn-danger'>
                    <MdOutlineSaveAlt /> {currentUser.username === addRecipe.username ? 'Save a recipe' : 'Saved'}
                </button>

            <Row xs={1} md={2} lg={3} className="justify-content-center">   
        
            <Image src={addRecipe.img_url=recipeDetail.image} className="recipe-img" />   
            </Row>
            <h3 className="recipe-title">{addRecipe.title=recipeDetail.title}</h3>
            </form>
            <Button 
                size="lg"
                variant="#ff6347"
                style={{backgroundColor:"#ff6347", color:"white"}} 
                className={ activeBtn === 'instructions' ? 'active' : ''}  
                onClick={()=> setActiveBtn("instructions")}>Instructions</Button>{'  '}
            <Button
                size="lg"
                variant="#ff6347"
                style={{backgroundColor:"#ff6347", color:"white"}}  
                className={ activeBtn === 'ingredients' ? 'active' : ''} 
                onClick={()=> setActiveBtn("ingredients")}>Ingredients</Button>
            
            {activeBtn === 'instructions' && (
            <Card className="instruction_info">
                <p dangerouslySetInnerHTML={{ __html : recipeDetail.summary}}></p>
                <p dangerouslySetInnerHTML={{ __html : recipeDetail.instructions}}></p>
            </Card>                   
            )}    
            {activeBtn === 'ingredients' && (
            <Card className="instruction_info">
            <ul>
                {recipeDetail.extendedIngredients.map((item)=>
                <li ley={item.id}> &#12685; {item.original}</li>
                )}
            </ul>
            </Card>                   
            )}    
            </Container>
        </div>
    )
}

export default Recipe;