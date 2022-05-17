import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOK_DATA } from '../graphql/Queries'
import classes from './book.module.css'

function Book() {

    const { loading, error, data } = useQuery(GET_BOOK_DATA)



    //setting the state of our app to showcase the whole data or an individual or word
    const [content, setContent] = useState(true);
    const [word_, setWord] = useState(null);

    //this method is used to show an individual word when clicked
    const handleWord = (word) => {
        setContent(false);
        setWord(word);
    }
    if (loading) {
        return <div>loading</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (

        <>

            <h1>
                {data.book.title}
            </h1>

            <h3>
                {data.book.author}
            </h3>


            {/* using the map method to loop over  our data */}

            {content ? data.book.pages.map((dataObj, index) => {
                let pageData = dataObj.tokens;

                let words = [];
                pageData.map((item) => {
                    let val = item.value;
                    console.log(val)
                    words.push(val);
                    return words
                });

                return <div className={classes.paragraph} key={index}>{words.map((word, id) => {
                    return (<span id={id} onClick={() => { handleWord(word) }} >{word + " "}</span>)
                })}</div>
            }) : <span>{word_}</span>
            }

        </>

    )
}

export default Book