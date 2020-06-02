import React from 'react';

import './homepage.styles.scss';


const HomePage = () => {
    const [text, setText] = React.useState('');
    const [mostFrequentWords, setMostFrequentWords] = React.useState([]);

    const handleChange = async event => {
        const { value } = event.target;
        await setText(value);
    } 

    const handleSubmit = async event => {
        event.preventDefault();
        let words = chooseWords(text)
        console.log(words)
    }

    const chooseWords = textToEdit => {
        textToEdit = textToEdit.toLowerCase();
        textToEdit = textToEdit.replace(/[&\/\\#,+=()$~%.'0-9":;*_?<>{}]/g, ' ');

        let wordsList = textToEdit.split(" ");

        // filter out not wanted words
        wordsList = wordsList.filter(word=> !['-', '–', ' ', ''].includes(word))
        // count words
        const wordsDictionary = {};



        for(const word of wordsList) {
            if(word in wordsDictionary){
                wordsDictionary[word]++;
            } else {
                wordsDictionary[word] = 1;
            }
        }

        // choose n biggest words
        const wordsLimit = 20;

        // Create items array
        const items = Object.keys(wordsDictionary).map(function(key) {
            return [key, wordsDictionary[key]];
        });
        
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        setMostFrequentWords(items.slice(0, wordsLimit))
        
        // Create a new array with only the first 5 items
        console.log(items.slice(0, wordsLimit));

        
        return wordsDictionary;
    }
    
    return(
        <div className='home-page'>
            <div className='text-input-box'>
                <div>Put text to generate words dictionary.</div>
                <form onSubmit={handleSubmit}>
                    <textarea className='text-input' value = {text} onChange = {handleChange}></textarea>
                    <button>Generate</button>
                </form>
            </div>
            <div className='words-list-box'>
                <div className='words-list'>
                    {mostFrequentWords.map(word => <div className='word-box' key={word[0]}><div className='word'>{word[0]}</div><div className='word-meaning'>{word[1]}</div></div>)}
                </div>
            </div>
        </div>
    )
}

export default HomePage;