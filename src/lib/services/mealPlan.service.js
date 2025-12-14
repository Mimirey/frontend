import { browser } from "$app/environment";


const STORAGE_KEY ='edupangan_meal_plan';

export const mealPlanService={
    save:(mealPlan)=>{
        try{
            if (!browser) return [];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mealPlan));
            return true;
        } catch (error){
            console.error('Error saving meal plan:', error);
            return false;
        }
    },

    load: ()=>{
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved): null;
        } catch (error) {
            console.error('Error loading meal plan:', error);
            return null;
        }
    },

    export: (mealPlan)=>{
        const dataStr= JSON.stringify(mealPlan, null, 2);
        const dataBlob= new Blob([dataStr], {type: 'application/json'});
        const url= URL.createObjectURL(dataBlob);

        const link= document.createElement('a');
        link.href= url;
        link.download= `meal-plan-${new Date().toISOString().split('T'[0])}.json`;
        link.click();

        URL.revokeObjectURL(url);
    },

    import: async (file)=>{
        return new Promise((resolve, reject)=>{
            const reader= new FileReader();

            reader.onload= (e)=>{
                try {
                    const mealPlan= JSON.parse(e.target.result);
                    resolve(mealPlan);
                } catch (error) {
                    reject(new Error('Invalid meal plan file'));
                }
            };

            reader.onerror= ()=> reject(new Error ('error reading file'));
            reader.readAsText(file);
        });
    }
}
