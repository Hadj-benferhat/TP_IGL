import React from 'react'
import {useState} from 'react'
import HeaderTable from './HeaderTable'
import RowTable from './RowTable'
import ShowInfo from './ShowInfo'
const Table = ({articules, showSearchPage, addToFavor, deleteFavor, clickedItems, setClickedItems,moreInfo, setMoreInfo, setMoreInfoDisplay})=> {
    // const data = [
    //     {
    //         id: 1,
    //         title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "http://google.com",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 2,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 3,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 4,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 1,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 2,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 3,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 4,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 1,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 2,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofianefdghjbkmnjbhvgfcvbn m,.",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 3,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //     {
    //       id: 4,
    //       title: "hadj",
    //         samary: "request.samary",
    //         authors: "request.authors sofiane",
    //         institutions: "request.institutions esi",
    //         integralText: "request.integralText bejaya",
    //         pdfUrl: "request.pdfUrl",
    //         reference: "request.reference",
    //         keyWords : "request.keyWord"
    //     },
    //   ]
    const favorChoose = new Array(articules.length).fill(false);
    const favorChooses= [];
    const [articleInfo, setArticleInfo]= useState(false);
    const [articleShow, setArticleShow]= useState({});
  return (
      <>
        {articules.length ? (
          <table cellSpacing={0}>
          <HeaderTable 
          header={['Num', 'Title', 'Authors', 'Key Words', 'Actions']}
        />
        <tbody>
          {articules.map((item, index) => (
            <React.Fragment key={index}>
              <RowTable
                champs={['id', 'title', 'authors', 'keyWords', 'pdfUrl']}
                item={item}
                index={index + 1}
                showSearchPage={showSearchPage}
                addToFavor={addToFavor}
                deleteFavor={deleteFavor}
                articleInfo={articleInfo}
                setArticleInfo={setArticleInfo}
                articleShow={articleShow}
                setArticleShow={setArticleShow}
                favorChooses={favorChooses}
               clickedItems={clickedItems}
               setClickedItems={setClickedItems}
               setMoreInfo={setMoreInfo}
               setMoreInfoDisplay={setMoreInfoDisplay}

              />
              {index < articules.length - 1 && (
                <tr className="separator-row">
                  <td colSpan={5}></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
        </table>

        ) : (

          <p className='casParticulier'>There are no desired articles</p>
        )}
        {
          articleInfo ? (
            <ShowInfo 
             article={articleShow}
              articleInfo={articleInfo}
              setArticleInfo={setArticleInfo}
              moreInfo={moreInfo}
             setMoreInfo={setMoreInfo}
             setMoreInfoDisplay={setMoreInfoDisplay}
            />
          ) : null
        }

      </>
  )}  

export default Table
