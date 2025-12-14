import { foodItems, targetComposition, tolerancePercent } from "$lib/data/foodData";

export class SusunPiringGame{
    constructor(){
        this.plate={
            karbohidrat: [],
            protein:[],
            sayuran:[],
            buah:[]
        };
        this.score= 0;
        this.maxScore=100;
        this.bonusPoints= 0
    }

    addFood(food, kategori){
        if (food.kategori !== kategori){
            return {
                success: false,
                message: `${food.nama} bukan ${kategori}!`
            };
        }

        const exists= this.plate[kategori].find(item=> item.id === food.id);
        if (exists){
            return{
                success:false,
                message:`${food.nama} sudah ada di piring!`
            }
        }

        this.plate[kategori].push(food);
        return{
            success:true,
            message:`${food.nama} ditambahkan`
        };
    }

    removeFood(foodId, kategori){
        this.plate[kategori]= this.plate[kategori].filter(
            item=>item.id !== foodId
        );
    }

    getTotalPortion(kategori){
        return this.plate[kategori].reduce((total, food)=>{
            return total + food.porsi
        },0);
    }

    getComposition(){
        const totalKarbo= this.getTotalPortion('karbohidrat');
        const totalProtein = this.getTotalPortion('protein');
        const totalSayur= this.getTotalPortion('sayuran');
        const totalBuah= this.getTotalPortion('buah');

        const totalPortion = totalKarbo + totalProtein +totalSayur+ totalBuah;

        if(totalPortion===0){
            return{
                karbohidrat: 0,
                protein:0,
                buah:0,
                sayuran:0
            };
        }

        return{
            karbohidrat: (totalKarbo/ totalPortion)*100,
            protein:(totalProtein/totalPortion)*100,
            sayuran: (totalSayur/totalPortion)*100,
            buah:(totalBuah/totalPortion)*100
        };
    }

    validateComposition(){
        const composition= this.getComposition();
        const results={};
        let totalScore= 0;

        Object.keys(targetComposition).forEach(kategori =>{
            const target = targetComposition[kategori];
            const actual= composition[kategori];
            const difference = Math.abs(target - actual);

            const isCorrect= difference <= tolerancePercent;

            let categoryScore =0;
            if (isCorrect) {
                categoryScore=25;
            } else if (difference <= 10){
                categoryScore=15;
            }else if (difference<=15) {
                categoryScore=10;
            }else {
                categoryScore=5;
            }

            results[kategori]={
                target: target,
                actual: Math.round(actual * 10)/10,
                difference: Math.round(difference*10)/10,
                isCorrect: isCorrect,
                score: categoryScore
            };
            
            totalScore +=categoryScore;
        })

        const localFoods = this.getAllFoods().filter(food => food.isLocal);
        this.bonusPoints= localFoods.length * 5;

        this.score= totalScore + this.bonusPoints;

        return{
            results: results,
            totalScore: this.score,
            bonusPoints: this.bonusPoints,
            maxScore: this.maxScore,
            percentage:(this.score / this.maxScore) * 100
        };
    }

    getAllFoods(){
        return[
            ...this.plate.karbohidrat,
            ...this.plate.protein,
            ...this.plate.sayuran,
            ...this.plate.buah
        ];
    }

    isPlateComplete(){
        return Object.keys(this.plate).every(kategori =>{
            return this.plate[kategori].length > 0;
        });
    }

    reset(){
        this.plate = {
            karbohidrat: [],
            protein: [],
            sayuran: [],
            buah: []
        };
        this.score= 0;
        this.bonusPoints= 0;
    }

    getGrade(){
        const percentage= (this.score / this.maxScore) *100;
        if (percentage >= 90) return {grade: 'A', message: 'Sempurna'};
        if (percentage >=75) return {grade: 'B', message: 'Bagus sekali!'};
        if (percentage>=60) return {grade: 'C', message: 'Cukup baik!'};
        return {grade: 'D', message: 'Coba lagi ya!'};
    }

    
}