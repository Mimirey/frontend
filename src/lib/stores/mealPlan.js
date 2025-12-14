
import { mealPlanService } from "$lib/services/mealPlan.service";
import { derived, writable } from "svelte/store";

const createMealPlanStore=()=>{
    const initialState={
        currentWeek:{
            monday: { breakfast: null, lunch: null, dinner: null, snacks: [] },
            tuesday: { breakfast: null, lunch: null, dinner: null, snacks: [] },
            wednesday: { breakfast: null, lunch: null, dinner: null, snacks: [] },
            thursday: { breakfast: null, lunch: null, dinner: null, snacks: [] },
            friday: { breakfast: null, lunch: null, dinner: null, snacks: [] },
            saturday: { breakfast: null, lunch: null, dinner: null, snacks: [] },
            sunday: { breakfast: null, lunch: null, dinner: null, snacks: [] }
        }, weekStartDate: new Date()
    };

    const {subscribe, set, update}= writable(initialState);

    return{
        subscribe,

        addMeal: (day, mealType, recipe)=>{
            update(state =>{
                if (mealType === 'snacks') {
                    state.currentWeek[day].snacks.push(recipe);
                } else {
                    state.currentWeek[day][mealType]= recipe;
                }
                mealPlanService.save(state);
                return state;
            });
        },

        removeMeal: (day, mealType, index = null)=>{
            update(state =>{
                if (mealType === 'snacks' && index !== null) {
                    state.currentWeek[day].snacks.splice(index, 1);
                } else{
                    state.currentWeek[day][mealType]= null;
                }
                mealPlanService.save(state);
                return state;
            });
        },

        clearDay: (day)=>{
            update(state=>{
                state.currentWeek[day]={
                    breakfast: null,
                    lunch: null,
                    dinner: null,
                    snacks:[]
                };
                mealPlanService.save(state);
                return state;
            });
        },

        clearWeek: ()=>{
            set(initialState);
            mealPlanService.save(initialState);
        },

        load: ()=>{
            const saved= mealPlanService.load();
            if(saved){
                set(saved);
            }
        },

        setWeekStartDate: (date)=>{
            update(state=>{
                state.weekStartDate= date;

            });
        }
    };
};

export const mealPlan= createMealPlanStore();

export const shoppingList= derived(mealPlan,$mealPlan=>{
    const ingredients= {};

    Object.values($mealPlan.currentWeek).forEach(day=>{
        ['breakfast','lunch','dinner', ...day.snacks].forEach(meal =>{
            if (meal && meal.ingredients) {
                meal.ingredients.forEach(ingredient =>{
                    if (ingredients[ingredient.name]) {
                        ingredients[ingredient.name].amount += parentFloat(ingredient.amount)|| 0;
                    }else{
                        ingredients[ingredient.name]={
                            name: ingredient.name,
                            amount: parseFloat(ingredient.amount) || 0,
                            unit: ingredient.unit,
                            category:ingredient.category|| 'lainnya'
                        };
                    }
                });
            }
        });
    });

    return Object.values(ingredients).sort((a,b)=>
        a.category.localCompare(b.category)
    );
});

export const weeklyNutrition= derived(mealPlan, $mealPlan=>{
    const totals = {
        calories:0,
        protein:0,
        carbs:0,
        fat: 0,
        fiber: 0
    };

    Object.values($mealPlan.currentWeek).forEach(day =>{
        ['breakfast', 'lunch', 'dinner', ...day.snacks].forEach(meal => {
            if (meal && meal.nutrition) {
                totals.calories += meal.nutrition.calories || 0;
                totals.protein += meal.nutrition.protein || 0;
                totals.carbs += meal.nutrition.carbs || 0;
                totals.fat += meal.nutrition.fat|| 0;
                totals.fiber += meal.nutrition.fiber || 0;
            }
        });
    });

    return {
        ...totals,
        daily:{
            calories: Math.round(totals.calories/7),
            protein: Math.round(totals.protein/7),
            carbs: Math.round(totals.carbs/7),
            fat: Math.round(totals.fat/7),
            fiber: Math.round(totals.fiber/7)
        }
    };
})


