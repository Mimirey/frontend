import { derived, writable } from "svelte/store";
import { AdventureGame } from "./gameLogic";

function createAdventureStore() {
    const game = new AdventureGame();

    const {subscribe, set, update}= writable({
        gameInstance: game,
        player: game.player,
        map: game.map,
        items: game.items,
        collectedItems: game.collectedItems,
        score: game.score,
        combo: game.combo,
        quests: game.quests,
        achievements: game.achievements,
        selectedItem: null,
        showItemModal: false,
        showQuestPanel: true,
        elapsedTime:0,
        gameComplete:false,
        powerups:game.powerups
    });

    let gameLoopId= null;
    let timerInterval= null;

    return{
        subscribe,

        setViewportSize(width, height) {
            update(state => {
                state.gameInstance.setViewportSize(width, height);
                return {
                    ...state,
                    map: {...state.gameInstance.map}
                };
            });
        },

        startGame(){
            timerInterval= setInterval(() => {
                update(state=>{
                    state.gameInstance.elapsedTime= Math.floor((Date.now()- state.gameInstance.startTime)/1000);
                    return{
                        ...state,
                        elapsedTime:state.gameInstance.elapsedTime
                    };
                });
            }, 1000);
        },

        

        movePlayer(dx, dy){
                update(state=>{
                    state.gameInstance.movePlayer(dx,dy);

                    const collected= state.gameInstance.checkCollisions();

                    if (collected.length > 0) {
                        state.selectedItem= collected[0];
                        state.showItemModal= true;

                    }
                    return{
                        ...state,
                        player: {...state.gameInstance.player},
                        map:{...state.gameInstance.map},
                        items:[...state.gameInstance.items],
                        collectedItems:[...state.gameInstance.collectedItems],
                        score: state.gameInstance.score,
                        combo: state.gameInstance.combo,
                        quests:{...state.gameInstance.quests},
                        achievements:[...state.gameInstance.achievements],
                        gameComplete: state.gameInstance.isGameComplete()
                    };
                });
        },

        closeItemModal(){
            update(state=> ({
                ...state,
                showItemModal:false,
                selectedItem:null
            }));
        },

        toggleQuestPanel(){
            update(state=>({
                ...state,
                showQuestPanel: !state.showQuestPanel
            }));
        },

        activatePowerup(type, duration){
            update(state=>{
                state.gameInstance.activatePowerup(type, duration);
                return{
                    ...state,
                    powerups:{...state.gameInstance.powerups}
                };
            });
        },
        restart(){
            clearInterval(timerInterval);
            const newGame= new AdventureGame();
            set({
                gameInstance:newGame,
                player: newGame.player,
                map: newGame.map,
                items: newGame.items,
                collectedItems: newGame.collectedItems,
                score:newGame.score,
                combo: newGame.combo,
                quests: newGame.quests,
                achievements: newGame.achievements,
                selectedItem: null,
                showItemModal: false,
                showQuestPanel: true,
                elapsedTime: 0,
                gameComplete: false,
                powerups: newGame.powerups
            });
            this.startGame();
        },

        cleanup(){
            clearInterval(timerInterval);
            cancelAnimationFrame(gameLoopId);
        }
    };

}
export const adventureStore= createAdventureStore();

export const progress= derived(
    adventureStore,
    $store => $store.gameInstance.getProgress()    
);

export const completedQuests= derived(
    adventureStore,
    $store => $store.gameInstance.getCompletedQuests()
);

export const unlockedAchievements= derived(
    adventureStore,
    $store=> $store.gameInstance.getUnlockedAchievements()
);

