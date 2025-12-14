import { browser } from "$app/environment";
import { updated } from "$app/state";
import { writable } from "svelte/store";

const STORAGE_KEY='edupangan_custom_recipes';

const createCustomRecipesStore=()=>{
    const loadRecipes=()=>{
        try {
            if (!browser) return [];
            const saved= localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved): [];
        } catch (error) {
            console.error('Error loading custom recipes:', error);
            return []; 
        }
    };

    const {subscribe, set, update}= writable(loadRecipes());

    const saveToStorage =(recipes)=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
        } catch (error) {
            console.error('Error saving custom recipes:', error);
        }
    };

    return{
        subscribe,

        add: (recipe)=>{
            update(recipes=>{
                const newRecipes =[...recipes, recipe];
                saveToStorage(newRecipes);
                return newRecipes;
            });
        },

        remove:(recipeId)=>{
            update(recipes =>{
                const filtered= recipes.filter(r=> r.id !== recipeId);
                saveToStorage(filtered);
                return filtered;
            });
        },

        update:(recipeId, updatedRecipe)=>{
            update(recipes=>{
                const newRecipes= recipes.map(r=>
                    r.id === recipeId ? {...r,...updatedRecipe}: r
                );
                saveToStorage(newRecipes);
                return newRecipes;
            });
        },

        clear:()=>{
            set([]);
            localStorage.removeItem(STORAGE_KEY);
        },

        load: ()=>{
            set(loadRecipes());
        }
    };
};

export const customRecipes = createCustomRecipesStore();