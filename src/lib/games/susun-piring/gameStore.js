import { foodItems } from "$lib/data/foodData";
import { SusunPiringGame } from "./gameLogic";
import { writable, derived } from 'svelte/store';

function createSusunPiringStore(){
    const game = new SusunPiringGame();

    const {subscribe, set, update}= writable({
        gameInstance: game,
        availableFoods: foodItems,
        plate: game.plate,
        selectedFood: null,
        validationResult: null,
        showResult: false,
        feedback: null
    });

    return {
        subscribe,

        selectedFood: (food)=> update(state =>({
            ...state,
            selectedFood: food
        })),

        dropFood: (kategori)=> update(state =>{
            if (!state.selectedFood) return state;

            const result = state.gameInstance.addFood(state.selectedFood, kategori);

            return {
                ...state,
                plate: {...state.gameInstance.plate},
                selectedFood: null,
                feedback:{
                    success:result.success,
                    message: result. message
                }
            };
        }),

        removeFood: (foodId, kategori)=> update(state =>{
            state.gameInstance.removeFood(foodId, kategori);

            return{
                ...state,
                plate: {...state.gameInstance.plate},
                feedback: null
            };
        }),

        cleadFeedback:()=> update (state=> ({
            ...state,
            feedback: null
        })),

        checkComposition:()=> update(state =>{
            const result= state.gameInstance.validateComposition();

            return{
                ...state,
                validationResult: result,
                showResult: true
            };
        }),

        restart: ()=>{
            const newGame = new SusunPiringGame();
            Set({
                gameInstance: newGame,
                availableFoods: foodItems,
                plate: game.plate,
                selectedFood:null,
                validationResult: null,
                showResult: false,
                feedback: null
            });
        }
    };
}

export const susunPiringStore = createSusunPiringStore();

export const composition = derived(
    susunPiringStore,
    $store => $store.gameInstance.getComposition()
);

export const isPlateComplete= derived(
    susunPiringStore,
    $store => $store.gameInstance.isPlateComplete()
);

export const finalGrade = derived(
    susunPiringStore,
    $store => $store.gameInstance.getGrade()
);