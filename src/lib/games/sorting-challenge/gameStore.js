import { derived, writable } from "svelte/store";
import { SortingGame } from "./gameLogic";

function createSortingStore() {
    const game= new SortingGame('normal');

    const {subscribe, set, update}= writable({
        gameInstance: game,
        fallingItems: game.fallingItems,
        score: game.score,
        lives: game.lives,
        combo:game.combo,
        level: game.level,
        isGameOver: game.isGameOver,
        isPaused: game.isPaused,
        feedback: null
    });

    let spawnIntervalId=null;
    let updateIntervalId= null;
    let lastUpdate= Date.now();

    return{
        subscribe,

        startGame(){
            spawnIntervalId= setInterval(()=>{
                update(state =>{
                    state.gameInstance.spawnItem();
                    return{
                        ...state,
                        fallingItems:[...state.gameInstance.fallingItems]
                    };
                });
            }, game.spawnInterval);

            updateIntervalId= setInterval(() => {
                const now= Date.now();
                const deltaTime= now-lastUpdate;
                lastUpdate= now;

                update(state=>{
                    state.gameInstance.updateItems(deltaTime);
                    return{
                        ...state,
                        fallingItems:[...state.gameInstance.fallingItems],
                        score: state.gameInstance.score,
                        lives: state.gameInstance.lives,
                        combo: state.gameInstance.combo,
                        level: state.gameInstance.level,
                        isGameOver: state.gameInstance.isGameOver
                    };
                });
            }, 16);
        },

        sortItem(itemId,category){
            update(state=>{
                const result = state.gameInstance.sortItem(itemId, category);

                let feedbackMsg= null;
                if (result.success) {
                    if (result.success) {
                        feedbackMsg={
                            type:'correct',
                            message:`+${result.points} poin!`,
                            combo: result.combo
                        };
                    } else{
                        feedbackMsg={
                            type:'wrong',
                            message:`Salah kategori! seharusnya ${result.correctCategory}`,
                            correctCategory:result.correctCategory
                        };
                    }
                }

                return {
                    ...state,
                    fallingItems: [...state.gameInstance.fallingItems],
                    score: state.gameInstance.score,
                    lives: state.gameInstance.lives,
                    combo: state.gameInstance.combo,
                    isGameOver: state.gameInstance.isGameOver,
                    feedback: feedbackMsg
                };
            });

            setTimeout(() => {
                update(state=>({
                    ...state,
                    feedback:null
                }));
            }, 1500);
        },

        pause(){
            update(state=>{
                state.gameInstance.pause();
                return{
                    ...state,
                    isPaused:true
                };
            });
        },

        resume(){
            update(state=>{
                state.gameInstance.resume();
                lastUpdate= Date.now();
                return{
                    ...state,
                    isPaused:false
                };
            });
        },

        restart(){
            this.cleanup();
            const newGame= new SortingGame('normal');
            set({
                gameInstance:newGame,
                fallingItems:newGame.fallingItems,
                score:newGame.score,
                lives: newGame.lives,
                combo: newGame.combo,
                level: newGame.level,
                isGameOver: newGame.isGameOver,
                isPaused:newGame.isPaused,
                feedback:null
            });
            this.startGame();
        },
        cleanup(){
            clearInterval(spawnIntervalId);
            clearInterval(updateIntervalId);
        }
    };
}

export const sortingStore= createSortingStore();

export const stast= derived(
    sortingStore,
    $store=> $store.gameInstance.getStats()
);