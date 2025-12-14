import { achievements, mapConfig, panganItems, quests } from "$lib/data/adventureData";

export class AdventureGame{
    constructor(){
        this.player={
            x:100,
            y:300,
            speed:5,
            baseSpeed:5,
            width:50,
            height: 50,
            direction: 'down'
        };

        this.map={
            width: mapConfig.width,
            height:mapConfig.height,
            offsetX:0,
            offsetY:0
        };

        this.viewport= mapConfig.viewport;

        this.items=[];
        this.collectedItems=[];
        this.npcs=[];

        this.score=0;
        this.combo=0;
        this.comboTimer= null;

        this.quests = JSON.parse(JSON.stringify(quests));
        this.achievements= JSON.parse(JSON.stringify(achievements));

        this.startTime= Date.now();
        this.elapsedTime=0;

        this.powerups={
            speed:false,
            magnet:false
        }

        this.initializeItems();

    }

    setViewportSize(width, height) {
        this.viewport.width = width;
        this.viewport.height = height;
        this.updateCamera(); // Re-calculate camera position
    }

    initializeItems(){
        panganItems.forEach((pangan, index)=>{
            const item ={
                ...pangan,
                x:200 + (index%4) * 400 + Math.random()* 200,
                y:200 + Math.floor(index/4) * 400 +Math.random() * 200,
                width:40,
                height:40,
                collected:false
            };
            this.items.push(item);
        });
    }

    movePlayer(dx,dy){
        const newX= this.player.x + dx * this.player.speed;
        const newY= this.player.y + dy * this.player.speed;

        this.player.x= Math.max(0, Math.min(this.map.width - this.player.width, newX));
        this.player.y=Math.max(0, Math.min(this.map.height-this.player.height,newY));

        if (dx>0) this.player.direction= 'right';
        else if (dx < 0) this.player.direction ='left';
        else if (dy > 0) this.player.direction ='down';
        else if (dy < 0) this.player.direction ='up';

        this.updateCamera();
    }

    updateCamera(){
        // Dead zone - kamera hanya bergerak kalau player mendekati edge viewport
        const deadZoneX = this.viewport.width * 0.3; // 30% dari viewport
        const deadZoneY = this.viewport.height * 0.3;
        
        const playerScreenX = this.player.x - this.map.offsetX;
        const playerScreenY = this.player.y - this.map.offsetY;
        
        // Gerakkan kamera hanya kalau player keluar dari dead zone
        if (playerScreenX < deadZoneX) {
            this.map.offsetX = Math.max(0, this.player.x - deadZoneX);
        } else if (playerScreenX > this.viewport.width - deadZoneX) {
            this.map.offsetX = Math.min(
                this.map.width - this.viewport.width,
                this.player.x - (this.viewport.width - deadZoneX)
            );
        }
        
        if (playerScreenY < deadZoneY) {
            this.map.offsetY = Math.max(0, this.player.y - deadZoneY);
        } else if (playerScreenY > this.viewport.height - deadZoneY) {
            this.map.offsetY = Math.min(
                this.map.height - this.viewport.height,
                this.player.y - (this.viewport.height - deadZoneY)
            );
        }

    }

    checkCollisions(){
        const collected= [];

        this.items.forEach((item,index)=>{
            if (item.collected) return;

            const distance= this.getDistance(this.player,item);
            const collectRadius= this.powerups.magnet ? 100 : 30;

            if (distance < collectRadius) {
                this.collectItem(index);
                collected.push(item);
            }
        });
        return collected;
    }

    getDistance(obj1, obj2){
        const dx= (obj1.x + obj1.width/2) - (obj2.x + obj2.width/2);
        const dy= (obj1.y + obj1.height/2)- (obj2.y + obj2.height/2);
        return Math.sqrt(dx * dx + dy * dy);
    }

    collectItem(index){
        const item= this.items[index];
        item.collected= true;

        this.collectedItems.push(item);
        this.score += item.points;

        this.combo++;
        clearTimeout(this.comboTimer);
        this.comboTimer= setTimeout(()=>{
            this.combo=0;
        }, 3000);

        if (this.combo > 1) {
            this.score += this.combo * 5;
        }

        this.checkQuests();

        this.checkAchievments();

        return item;
    }

    checkQuests(){
        this.quests.forEach(quest=>{
            if (quest.completed) return;

            if (quest.target === 'all') {
                if (this.collectedItems.length === this.items.length) {
                    quest.completed = true;
                    this.score += quest.reward.points;
                }
            } else{
                const collectedIds= this.collectedItems.map(item => item.id);
                const hasAll = quest. target.every(id => collectedIds.includes(id));

                if (hasAll) {
                    quest.completed = true;
                    this.score += quest.reward.points;
                }
            }
        });
    }

    checkAchievments(){
        this.elapsedTime= Math.floor((Date.now()- this.startTime)/1000);

        this.achievements.forEach(achievement =>{
            if (achievement.unlocked) return;

            let unlocked= false;

            switch (achievement.id) {
                case 'speed_runner':
                    if (this.collectedItems.length === this.items.length && this.elapsedTime < 120) {
                        unlocked=true;
                    }
                    break;
            
                case 'completionist':
                    if (this.collectedItems.length === this.items.length) {
                        unlocked= true;
                    }
                    break;
                case 'combo_master':
                    if (this.combo >= 5) {
                        unlocked=true;
                    }
                    break;
            }
            if (unlocked) {
                achievement.unlocked=true;
                this.score += 50;
            }
        });
    }

    activatePowerup(type,duration){
        this.powerups[type]= true;

        if (type === 'speed') {
            this.player.speed = this.player.baseSpeed *1.5;
        }

        setTimeout(()=>{
            this.powerups[type]= false;
            if (type === 'speed') {
                this.player.speed= this.player.baseSpeed;
            }
        }, duration);
    }

    isGameComplete(){
        return this.collectedItems.length=== this.items.length;
    }

    getProgress(){
        return {
            collected: this.collectedItems.length,
            total: this.items.length,
            percentage: (this.collectedItems.length/this.items.length) * 100
        };
    }

    getCompletedQuests(){
        return this.quests.filter(q => q.completed);
    }

    getUnlockedAchievements(){
        return this.achievements.filter(a => a.unlocked);
    }
}