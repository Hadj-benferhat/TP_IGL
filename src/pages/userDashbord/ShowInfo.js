import { FaDownLong } from "react-icons/fa6";
import ArticleText from "./ArticleText.js"
import { IoIosCloseCircle } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";


const ShowInfo = ({article, articleInfo, setArticleInfo, moreInfo, setMoreInfo,setMoreInfoDisplay}) => {
  return (
    <main className='mainSupp'>
        <div className='infoSupp'>  
        <div className="closeInfoSupp">
          <button 
          className="closeButt" 
          onClick={()=>{
            articleInfo=false;
            setArticleInfo(articleInfo)
            }}>
            <IoIosCloseCircle />
          </button>
         
        </div>
        
        <h2>{article.title} </h2>
        <h4>Samary:</h4>
        <p>{article.samary}</p>
        <h4>Authors:</h4>
        <p>{article.authors}</p>
        <h4>Institutions:</h4>
        <p>{article.institutions}</p>
        <h4>keyWords:</h4>
        <p>{article.keyWords}</p>
        <h4>Reference:</h4>
        <p>{article.reference}</p>
        <div className="actionShow">
          <a href={article.pdfUrl} target='_blank'><FaFilePdf className='pdf'/></a>
          <a href={article.pdfUrl} download><FaFileDownload className="download"/></a>
         <button 
         className="closeButt"
         onClick={
          ()=>{
            setMoreInfo(article)
           setMoreInfoDisplay(true)
          }
         }><FaEye className="view"/></button>
        </div>
        

        </div>
        
    </main>
    
  )
}

export default ShowInfo
// "id":"1",
// "title": "La découverte d'une nouvelle espèce de papillon",
// "samary": "Une étude approfondie sur la biologie et le comportement de la nouvelle espèce de papillon découverte dans la forêt amazonienne.",
// "authors": "Dr. Marie Dupont, Dr. Pierre Martin",
// "institutions": "Université de Paris, Institut de Recherche sur la Biodiversité",
// "integralText": "Le texte intégral de cette étude est disponible pour les chercheurs et les amateurs de papillons. Il offre une analyse détaillée de la morphologie, du cycle de vie et de l'habitat de la nouvelle espèce.",
// "pdfUrl": "https://drive.google.com/file/d/19iwQ6RAikVDVJ9AWRt9wi9p1or5VUjIU/view",
// "reference": "Nature, Volume 543, Pages 123-125 (2017)",
// "keyWords": "papi  