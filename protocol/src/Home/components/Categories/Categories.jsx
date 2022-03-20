import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOADING_0, NOT_FOUND_404, STARTING_STATUS, SUCCESS_200 } from "../../../redux/consts";
import Actions from "../../../redux/actions";

import CategoriesCss from "./Categories.module.css";

const dummy=[];
export default function Categories(props)
{
    const categories = useSelector(state=>state.categories);
    const selectedCategory = useSelector(state=>state.selectedCategory)
    const dispatch = useDispatch();

    useEffect(()=>
    {
        if(categories.status===STARTING_STATUS)
        {
            dispatch(Actions.setCategoriesToLoading())
            dispatch(Actions.categoriesDataBaseAction())
        }
    },[]);  //busco las categorias al back
    let categoriesArr;

    function handleCategoryClick(name)
    {
        dispatch(Actions.selectedCategoryAction(name));
    }
    
    let selectedCategoryCont="";
    if(selectedCategory) selectedCategoryCont=<div id={CategoriesCss.selectedCategory} >{selectedCategory} <p onClick={()=>dispatch(Actions.resetSelectedCategory())}>X</p></div>;

    if(categories.status===STARTING_STATUS || categories.status===LOADING_0){categoriesArr=<p className={CategoriesCss.categoryStatus}>Loading Rockets...</p>}
    else if(categories.status===NOT_FOUND_404){categoriesArr=<p className={CategoriesCss.categoryStatus}>No Rockets Found!</p>;}
    else if(categories.status===SUCCESS_200){categoriesArr=categories.posts.map((element,index)=><button className={CategoriesCss.category} value={element.name} onClick={(e)=>handleCategoryClick(e.target.value)} key={"category_"+index}>{element.name}</button>);}
    //Cada categoria es un boton que actualiza la selectedCategory 
    
    return(
        <div id={CategoriesCss.CategoriesContainer}>
            <h2 id={CategoriesCss.categoriesH2}>Categories</h2>
            {selectedCategoryCont}
            <div id={CategoriesCss.categoriesArrCont}>{categoriesArr}</div>
        </div>
    )
}