export class TebakPanganGame{
    constructor(questions){
        this.questions= questions;
        this.currentIndex=0;
        this.score=0;
        this.maxScore=questions.length*10;
    }
    getCurrentQuestion(){
        return this.questions[this.currentIndex];
    }
    getShuffledOptions(){
        const options= [...this.getCurrentQuestion().pilihan];
        return this.shuffleArray(options);
    }

    checkAnswer(answer){
        const correct= answer === this.getCurrentQuestion().nama;
        if (correct) {
            this.score +=10;
        }
        return{
            isCorrect: correct,
            correctAnswer: this.getCurrentQuestion().nama,
            score: this.score
        };

    }
    nextQuestion(){
        if(this.hasMoreQuestions()){
            this.currentIndex++;
            return true;
        }
        return false;
    }
    hasMoreQuestions(){
        return this.currentIndex < this.questions.length- 1;
    }
    getProgress(){
        return{
            current: this.currentIndex + 1,
            total: this.questions.length,
            percentage: ((this.currentIndex + 1)/ this.questions.length) * 100
        }
    }
    getGrade(){
        const percentage= (this.score/this.maxScore)* 100;
        if (percentage >= 90) return {grade: 'A', message: 'Luar biasa'};
        if (percentage >= 75) return {grade: 'B', message: 'Bagus'};
        if (percentage >= 60) return {grade: 'C', message: 'Cukup bagus'};
        return {grade: 'D', message: 'Ayo coba lagi!'};
    }

    reset(){
        this.currentIndex=0;
        this.score=0;
    }

    shuffleArray(array){
        const shuffled = [...array];
        for (let i= shuffled.length - 1; i > 0; i--){
            const j = Math.floor(Math.random()* (i + 1));
            [shuffled[i], shuffled[j]]= [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}