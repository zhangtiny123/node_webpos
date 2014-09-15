/**
* Created by tiny on 14-8-16.
*/
function Counting(type, name,barcode,price,unit){
    this.type = type;
    this.name = name;
    this.barcode = barcode;
    this.price = price;
    this.unit = unit;
    this.count = 0;
    this.promotion_number = 0;
    this.total_price = 0;
}

Counting.prototype.count_plus = function(plus_number){
    this.count += plus_number;
};

Counting.prototype.calculate_total_price = function(){
    this.total_price = 0;
    this.promotion_number = 0;
    if (this.is_promoted()){
        var left_count = this.count;
        while(left_count-3 >= 0){
            this.total_price += this.price*2;
            left_count -= 3;
            this.promotion_number += 1;
        }
        this.total_price += this.price*(left_count);
    }
    else {
        this.total_price += this.price*this.count;
    }
};

Counting.prototype.is_promoted = function(){
    var promotions = loadPromotions();
    var items = loadAllItems();
    for(var i=0; i<promotions[0].barcodes.length; i++){
        if (this.barcode == promotions[0].barcodes[i]){
            return true;
        }
    }
    return false;
};

