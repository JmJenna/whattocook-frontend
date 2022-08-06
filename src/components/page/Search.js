import React , {useEffect , useState} from 'react';
import getFoodRecipe from '../../api/FoodApi';
import {useParams, Link } from 'react-router-dom';
import {  Card , Container , Row } from 'react-bootstrap';
import './Search.css';

function Search(){
    const [searchRecipe, setSearchRecipe] = useState([]);
    const params = useParams();

    useEffect(()=>{
        async function searchRes(name){
            const searchResult = await getFoodRecipe.getRecipe('complexSearch',`query=${name}`);
            setSearchRecipe(searchResult.results)
        }
        searchRes(params.search)
    },[params.search])


    return(
        <div>
            <Container className="text-center">
            <h1 className='cuisineName'>" {params.search.toUpperCase()} " RECIPES </h1>
            <Row xs={1} md={2} lg={3} className="justify-content-center">           
            {searchRecipe.map((item)=>{
                return(
                    <Link to={`/recipe/${item.id}`} className='searchResult text-center'>
                                <Card style={{ width: '18rem' }} className='searchCard'>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Title className='searchTitle'>{item.title}</Card.Title> 
                                </Card>
                    </Link>
                )
            })}
            </Row>
            </Container>
        </div>   
    )
}

export default Search;

