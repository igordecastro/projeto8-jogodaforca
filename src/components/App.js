import { useState, useEffect } from "react";
import palavras from "./palavras"

export default function App() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const [wordArray, setWordArray] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [error, setError] = useState(0);
    const [clickedLetter, setClickedLetter] = useState([]);
    const [input, setInput] = useState("");


    useEffect(() => {
        if (playing) {
            const selectedWord = palavras[Math.floor(Math.random() * palavras.length)];
            let newArray = [];
            for (let i = 0; i < selectedWord.length; i++) {
                newArray.push(selectedWord[i]);
            }
            setWordArray(newArray);
        }
    }, [playing]);

    function startGame() {
        setPlaying(true);
    }

    function chooseLetter(chosenLetter) {
        if (!clickedLetter.includes(chosenLetter)) {
            setClickedLetter([...clickedLetter, chosenLetter]);

            if (!wordArray.includes(chosenLetter)) {
                if (error < 6) {
                setError(error + 1);
                if (error === 5) {
                    setPlaying(false);
                }
            }
            } 
        }
    }

    function verifyWord(word) {
        let tempword = ""
        for(let i = 0; i < wordArray.length; i++) {
            tempword += wordArray[i];
        }

        if(word === tempword){
            alert("Parabéns você ganhou!!");
        } else {
            setError(6);
            setPlaying(false);
        }
    }
    return (
        <div className="content">
            <div className="interface">
                <img src={`../../assets/forca${error}.png`} alt="Forca" />
                <div className="flex">
                    <button onClick={startGame}>Escolher Palavra</button>
                    {wordArray
                        ?
                        <p>{wordArray.map((w) => clickedLetter.includes(w) ? w : "_ ")}</p>
                        : ""
                    }
                </div>
            </div>
            <div className="guessWord">
                <div className="letters">
                    {playing
                        ?
                        alphabet.map((a, index) =>
                            <div
                                key={index}
                                className={clickedLetter.includes(a) ? "letter" : "letter inGame"}
                                onClick={() => chooseLetter(a)}>{a.toUpperCase()}
                            </div>)
                        :
                        alphabet.map((a, index) => <div key={index} className="letter" >{a.toUpperCase()}</div>)}
                </div>
                <div className="typeWord">
                    <p>Já sei a palavra!</p>
                    {playing ?
                        <input
                            type="text"
                            placeholder="Digite a palavra correta"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        : <input type="text" disabled />}
                    {playing ? <button onClick={() => verifyWord(input)}>Chutar</button> : <button disabled>Chutar</button>}
                </div>
            </div>
        </div>
    )
}