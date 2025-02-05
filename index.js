class Item {
    constructor(name, date, amount) {
        this.name = name;
        this.amount = amount;
        this.date = date;
    }
}

class Table {
    constructor(items) {
        this.items = items; // Store items array inside the class
    }
    toArr(){
        let newArr = [0][0];
        for(let r = 0; r < this.items.length; r++){
            for(let c = 0; c < 3; c++){
                if(c==0){
                    newArr[r].push(this.items[r].name)
                }else if(c==1){
                    newArr[r].push(this.items[r].amount)
                }else{
                    newArr[r].push(this.items[r].date)
                }
                
            }
        }
    }
    displayItems() {
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. Name: ${item.name}, Amount: ${item.amount},Date: ${item.date}`);
        });
    }
    
}