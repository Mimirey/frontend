export const calculatePercentage = (value, goal)=>{
    return Math.round((value / goal) * 100);
};

export const getNutritionColor = (percentage)=>{
    if (percentage < 80)return 'text-yellow-600';
    if (percentage > 120) return 'text-red-600';
};
export const formatNutrition= (value, unit ='g')=>{
    return `${Math.round(valie)} ${unit}`;
};

export const getDailyNutrition = (meals)=>{
    const totals={
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber:0
    };

    ['breakfast', 'lunch', 'dinner', ...meals.snacks].forEach(meal =>{
        if (meal && meal.nutrition) {
            Object.keys(total).forEach(key =>{
                totals[key] += meal.nutrition[key] || 0;
            });
        }
    });

    return totals;
};