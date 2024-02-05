import FavoritePage from './FavoritePage';
import ArticleText from './ArticleText';
import BarSearch from './BarSearch';
import DashBordManger from './DashBordManger';
import { useState } from 'react';
import apiRequest from './apiRequest';
import { TbArticleFilledFilled } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import './App.css';
import traiterAuteursEtInstitutions from "./Test";


const SherchArticlePage = () => {
    const API_URL='http://localhost:3000/articules';
  const API_FAF=' http://localhost:3500/favorite';
  const [articules,setArticules]=useState([]);
  const [favorite,setFavorite]=useState([]);
  const [isLeading, setIsLeading]=useState(false);
  const [fetchError, setFetchError]=useState(null);
  const [isSearche, setIsSearche]=useState(false);
  const [isSearcheFav, setIsSearcheFav]=useState(false);
  const [name,setName]=useState('');
  const [keyWord,setKeyWord]=useState('');
  const [auteur,setAuteur]=useState('');
  const [institution,setInstitution]=useState('');
  const [dStart,setDStart]=useState('');
  const [dEnd,setDEnd]=useState('');
  
//   a supprimer
const [showSearchPage, setShowSearchPage] = useState(true); // État pour suivre si la page de recherche est affichée
const [clickedItems, setClickedItems]= useState({});
const [moreInfo, setMoreInfo]= useState({});
const [moreInfoDisplay, setMoreInfoDisplay]= useState(false);

// *******************************************************
function ajouterInstitions(articules){
 articules.forEach(article=>{
  traiterAuteursEtInstitutions(article);
 })
}
function traiterAuteursEtInstitutions(article) {
  console.log(article.authors)
  const lignes = article.authors.replace(/,/g, '').split('\n');
  let auteurs = '';
  let institutions = '';

  let isAuthors = true; // Indique si nous sommes en train de traiter les auteurs

  lignes.forEach(ligne => {
      if (ligne.trim() !== '') {
          if (isAuthors) {
              // Si nous sommes en train de traiter les auteurs, ajoutons la ligne à la liste des auteurs
              if (isFirstLetterUpperCase(ligne)) {
                  console.log(ligne)
                  ligne += ',';
                  auteurs += ligne.trim();
                  isAuthors = false;
              }                
              

          } else {
              // Sinon, ajoutons la ligne à la liste des institutions
              if (institutions !== '') {
                  institutions += '\n';
              }
              institutions += ligne.trim();
              if(ligne.includes('@')) {
                  isAuthors = true;
                  institutions +=',';
              }
          }
      } 
  });
  if (auteurs.lastIndexOf(",") !== -1) { // Vérifie si une virgule existe dans la chaîne
    auteurs = auteurs.slice(0, auteurs.lastIndexOf(","));
}
if (institutions.lastIndexOf(",") !== -1) { // Vérifie si une virgule existe dans la chaîne
  institutions = institutions.slice(0, institutions.lastIndexOf(","));
}
  
      article.authors= auteurs;
      article.institutions=institutions;
  
}
function isFirstLetterUpperCase(chaine) {
  // Obtenez la première lettre de la chaîne
  const premiereLettre = chaine.charAt(0);
  // Vérifiez si la première lettre est égale à sa version en majuscule
  return premiereLettre === premiereLettre.toUpperCase();
}
// *******************************************************
  const searchArticle=async(API_URL,set,setSearchType)=>{
    const searchObj={
      "title": {name},
      "authors": {auteur},
      "category": {institution},
      "keyWords" : {keyWord}
    }
    const url = new URL(`${API_URL}`);
    url.search = new URLSearchParams(searchArticle).toString();

    try{
        setSearchType(true);
      setIsLeading(true);
      const response = await fetch(url);
      if(!response.ok)  {
        const errorMessage = 'Did not recive expected data';
        throw new Error(errorMessage);
      }
      var listArticules= await response.json();
      console.log(listArticules);
      set(listArticules);
      setFetchError(null)
    }catch (err){
      console.log('Error caught:', err.message);  // Ajoutez cette ligne
      console.log(err.stack);
      setFetchError('Did not recive expected data');
    }finally{
      ajouterInstitions(listArticules)
      setIsLeading(false)
    }

  }

  const addToFavor=async(article)=>{
  const element ={
      title: article.title,
      samary: article.samary,
      authors: article.authors,
      institutions: article.institutions,
      integralText: article.integralText,
      pdfUrl: article.pdfUrl,
      reference: article.reference,
      keyWords: article.keyWord,
      category: article.category
  };
  
  console.log(element)
  // const listeFav=[...articules,element];
  // setFavorite(listeFav);
  const addFavorObj={
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(element),
  };
  const urlUpd=`${API_FAF}`;
  const errMess =await apiRequest(urlUpd, addFavorObj)
  setFetchError(errMess);
  }

  const deleteFavor=async(article)=>{
    console.log(`check: ${article}`)
    console.log(`id: ${article.id}`)
    const updatedItems = favorite.filter((item) =>
    (item !== article)
  );
  setFavorite(updatedItems);

  const deliteOperation ={method:'DELETE'}
  const urlUpd=`${API_FAF}/${article.id}`;
  const errMess =await apiRequest(urlUpd, deliteOperation)
  setFetchError(errMess);

  }
    return (
      <>
      <div style={{ display: !moreInfoDisplay ? 'block' : 'none' }}>
      {
       showSearchPage  ? 
       <FaHeart 
       className='FavoriteLink'
       onClick={
         ()=>{
           setShowSearchPage(!showSearchPage);
           searchArticle(API_FAF,setFavorite,setIsSearcheFav);
         }        
       } />: 
       < IoMdArrowRoundBack
       className='FavoriteLink'
       onClick={
         ()=>{
           setShowSearchPage(!showSearchPage);
         }        
        }
       />
      } 
        <div className='searchPage' style={{ display: showSearchPage && !moreInfoDisplay ? 'flex' : 'none' }}>
        <h1 className='searchName'>Search Articules <TbArticleFilledFilled /></h1>
        <BarSearch
        API_URL={API_URL}
        setArticules={setArticules}
        API_FAF={API_FAF}
        setFavorite={setFavorite}
        name={name}
        setName={setName}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
        auteur={auteur}
        setAuteur={setAuteur}
        institution={institution}
        setInstitution={setInstitution}
        dStart={dStart}
        setDStart={setDStart}
        dEnd={dEnd}
        setDEnd={setDEnd}
        searchArticle={searchArticle}
        setIsSearche={setIsSearche}
        setClickedItems={setClickedItems}
        />
        {
            isSearche &&
            <DashBordManger 
            isSearche={isSearche}
            isLeading={isLeading}
            fetchError={fetchError}
            articules={articules}
            showSearchPage={showSearchPage}
            addToFavor={addToFavor}
            deleteFavor={deleteFavor}
            clickedItems={clickedItems}
            setClickedItems={setClickedItems}
            moreInfo={moreInfo}
            setMoreInfo={setMoreInfo}
            setMoreInfoDisplay={setMoreInfoDisplay}

            />  
        }
          
          
      </div>
      <div className="favoritePage" style={{ display: !showSearchPage && !moreInfoDisplay ? 'block' : 'none' }}>
                <FavoritePage 
                API_FAF={API_FAF}
                favorite={favorite}
                isSearche={isSearcheFav} 
                fetchError={fetchError}
                isLeading={isLeading}
                showSearchPage={showSearchPage}
                addToFavor={addToFavor}
                deleteFavor={deleteFavor}
                clickedItems={clickedItems}
               setClickedItems={setClickedItems}
               moreInfo={moreInfo}
               setMoreInfo={setMoreInfo}
               setMoreInfoDisplay={setMoreInfoDisplay}
                />
      </div>
      </div>


      <div className="artTxt" style={{ display: moreInfoDisplay ? 'block' : 'none' }}>
      <ArticleText 
        article={moreInfo}
        showSearchPage={showSearchPage}
        setMoreInfoDisplay={setMoreInfo}
        setShowSearchPage={setShowSearchPage}
        />
      </div>
      
      </>
    );
}

export default SherchArticlePage
