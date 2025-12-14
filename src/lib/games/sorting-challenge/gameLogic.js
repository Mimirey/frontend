import { difficultyLevels, sortingItems } from "$lib/data/sortingData";

export class SortingGame{
    constructor(difficulty ='normal'){
        this.difficulty = difficultyLevels[difficulty];
    this.score = 0;
    this.lives = 3;
    this.combo = 0;
    this.maxCombo = 0;
    this.level = 1;
    this.itemsSorted = 0;
    this.correctSorts = 0;
    this.wrongSorts = 0;
    
    this.fallingItems = [];
    this.nextItemId = 0;
    
    this.spawnInterval = this.difficulty.spawnInterval;
    this.fallSpeed = this.difficulty.fallSpeed;
    
    this.isGameOver = false;
    this.isPaused = false;
    
    this.startTime = Date.now();
    this.elapsedTime = 0;
    }

    spawnItem(){
        if(this.isGameOver || this.isPaused) return null;

        const randomItem = sortingItems[Math.floor(Math.random()* sortingItems.length)];
        const item ={
            id: this.nextItemId++,
            ...randomItem,
            x: Math.random()*80 + 10,
            y: -10,
            speed: this.fallSpeed,
            active: true
        };

        this.fallingItems.push(item);
        return item;
    }

    updateItems(deltaTime){
        if (this.isGameOver || this.isPaused) return;

        this.fallingItems.forEach(item =>{
            if (item.active) {
                item.y += item.speed * (deltaTime/16);

                if (item.y >110) {
                    this.handleMissedItem(item);
                }
            }
        });
        this.fallingItems= this.fallingItems.filter(item=> item.active);

        if (this.itemsSorted>0 && this.itemsSorted %10 ===0) {
            this.levelUp();
        }
    }

    sortItem(itemId, targetCategory){
        const item= this.fallingItems.find(i => i.id === itemId && i.active);
        if (!item) return {success: false};

        item.active= false;
        this.itemsSorted++;

        const isCorrect= item.kategori === targetCategory;

        if (isCorrect) {
            this.handleCorrectSort(item);
            return{
                success: true,
                correct: true,
                points: this.calculatePoints(),
                item:item
            };
            
        }else{
            this.handleWrongSort(item);
            return{
                success:true,
                correct:false,
                item:item,
                correctCategory: item.kategori
            };
        }
    }

    handleCorrectSort(item){
        this.combo++;
        this,this.correctSorts++;

        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }

        const points= this.calculatePoints();
        this.score += points;
    }

    handleWrongSort(item){
        this.combo=0;
        this.wrongSorts++;
        this.lives--;

        if (this.lives <=0) {
            this.gameOver();
        }
    }

    handleMissedItem(item){
        item.active= false;
        this.combo=0;
        this.lives--;

        if (this.lives <=0) {
            this.gameOver();
        }
    }

    calculatePoints(){
        const basePoints =10;
        const comboBonus= Math.min(this.combo * 2, 50);
        const levelBonus= (this.level -1)* 5;

        return basePoints + comboBonus +levelBonus;
    }

    levelUp(){
        this.level++;
        this.fallSpeed += this.difficulty.speedIncrease;
        this.spawnInterval= Math.max(500, this.spawnInterval -100);
    }

    gameOver(){
        this.isGameOver=true;
        this.elapsedTime= Math.floor((Date.now()- this,this.startTime)/1000);

    }
    pause(){
        this.isPaused= true;

    }
    resume(){
        this.isPaused=false;
    }
    getAccuracy(){
        const total= this.correctSorts + this.wrongSorts;
        if (total === 0) return 0;
        return Math.round((this.correctSorts/total) * 100);
    }

    getGrade(){
        const accuracy= this.getAccuracy();

        if (accuracy >= 95) return { grade: 'S', emoji: '🏆', color: '#FFD700' };
        if (accuracy >= 85) return { grade: 'A', emoji: '🌟', color: '#fbbf24' };
        if (accuracy >= 75) return { grade: 'B', emoji: '⭐', color: '#3b82f6' };
        if (accuracy >= 60) return { grade: 'C', emoji: '👍', color: '#10b981' };
        return { grade: 'D', emoji: '💪', color: '#6b7280' };
    }

    getStats() {
        return {
        score: this.score,
        lives: this.lives,
        combo: this.combo,
        maxCombo: this.maxCombo,
        level: this.level,
        itemsSorted: this.itemsSorted,
        correctSorts: this.correctSorts,
        wrongSorts: this.wrongSorts,
        accuracy: this.getAccuracy(),
        elapsedTime: this.elapsedTime,
        grade: this.getGrade()
        };
    }
}