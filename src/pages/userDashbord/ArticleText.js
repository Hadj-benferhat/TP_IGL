import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";


const ArticleText = ({article,setMoreInfoDisplay,setShowSearchPage,showSearchPage}) => {
    
      function combinerChaines(...chaines) {
        return chaines.join('');
    }
    function diviserChaineEnDivs(chaine) {
      const longueurMax = 1590;
      const mots = chaine.split(' ');
      let chaineActuelle = '';
  
      const divs = [];
  
      mots.forEach(mot => {
          if ((chaineActuelle.length + mot.length) <= longueurMax) {
              chaineActuelle += (chaineActuelle ? ' ' : '') + mot;
          } else {
              divs.push(`<div>${chaineActuelle}</div>`);
              chaineActuelle = mot;
          }
      });
  
      if (chaineActuelle) {
          divs.push(`<div>${chaineActuelle}</div>`);
      }
  
      return divs;
  }

function ContentComponent({ htmlStrings , className}) {
  return (
   
      <div className={className} id="contentText">
          {htmlStrings.map((htmlString, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: htmlString }}></div>
          ))}

      </div>
  );
}

function App(htmlStrings , className) {

  return (
          <ContentComponent 
          htmlStrings={htmlStrings} 
          className={className}
          />
  );
}

function fusionArt(auteur , institut) {
  if (!auteur || !institut) {
    return []; // Retourne un tableau vide si les valeurs sont undefined
  }
  const auteurs= auteur.split(',');
  const insituts= institut.split(',');
  const elements = auteurs.map((element, index) => {
    return `<div key=${index}><h4>${element}</h4><p>${insituts[index]}</p></div>`;
  });
  return elements;
}

function getNumber(chaine){
  const elements=chaine.split('\n');
  const elementsWithIndex = elements.map((element, index) => element=`<div><br><\/div>`+element);
  return elementsWithIndex.join('');
}
  
  return (
    <article>
      {article && (
  <>
 
  <a href="/SherchArticlePage">
  <IoMdArrowRoundBack
       className='FavoriteLink'
       onClick={
         ()=>{
          showSearchPage=false;
          console.log(showSearchPage)
          setMoreInfoDisplay(false)
         }        
        }
       />
  </a>
     
    <h2 className='titleArt'>{article.title}</h2>
    {App(fusionArt(article.authors, article.institutions), 'autInst')}
    {App(
      diviserChaineEnDivs(
        getNumber(
        combinerChaines(
          `<h3>ABSTRACT</h3><br>`,
          `${article.samary}`,
          `<div><br></div>`,
          `<h3>Categories and Subject Descriptors</h3><br>`,
          `${article.category}`,
          `<div><br></div>`,
          `<h3>KEYWORDS</h3><br>`,
          `${article.keyWords}`,
          `<div><br></div>`,
          `${article.integralText}`,
          `<div><br></div>`,
          `<h3>REFERENCES</h3>`,
          `<div><br></div>`,
          getNumber(`${article.reference}`)
        )
        )
      ),
      'contentText'
    )}
  </>
)}
      
    </article>
  )
}

export default ArticleText
