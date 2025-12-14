import { panganData } from "$lib/data/panganData";
import { writable, derived } from "svelte/store";
import { TebakPanganGame } from "./gameLogic";

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createGameStore() {
    const shuffledData= shuffleArray(panganData);
    const game = new TebakPanganGame(shuffledData);

    const {subscribe, set,update}= writable({
        gameInstance:game,
        currentQuestion: game.getCurrentQuestion(),
        shuffledOptions: game.getShuffledOptions(),
        selectedAnswer: null,
        showResult: false,
        result: null,
        gameFinished: false
    });

    return{
        subscribe,

        selectAnswer: (answer)=> update (state =>{
            const result = state.gameInstance.checkAnswer(answer);
            return {
                ...state,
                selectedAnswer: answer,
                showResult: true,
                result
            };
        }),

        nextQuestion: ()=> update(state=>{
            const hasMore = state.gameInstance.nextQuestion();

            if (hasMore){
                return{
                    ...state,
                    currentQuestion: state.gameInstance.getCurrentQuestion(),
                    shuffledOptions: state.gameInstance.getShuffledOptions(),
                    selectedAnswer: null,
                    showResult: false,
                    result: null 
                };
            } else {
                return{
                    ...state,
                    gameFinished: true
                };
            }
        }),

        restart: ()=> {
            const shuffledData= shuffleArray(panganData);
            const newGame = new TebakPanganGame(shuffledData);
            set({
                gameInstance: newGame,
                currentQuestion: newGame.getCurrentQuestion(),
                shuffledOptions: newGame.getShuffledOptions(),
                selectedAnswer: null,
                showResult: false,
                result: null,
                gameFinished: false
            });
        }   
    };
}
export const tebakPanganStore = createGameStore();

export const progress = derived(
    tebakPanganStore,
    $store => $store.gameInstance.getProgress()
);

export const finalGrade = derived(
    tebakPanganStore,
    $store=> $store.gameInstance.getGrade()
);