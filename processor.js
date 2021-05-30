//const events = require('events');
const EventEmitter = require('events').EventEmitter;

module.exports = class  OrderProcessor extends EventEmitter {

    placeOrder(orderData){
        this.emit("PROCESSING_STARTED", orderData.orderNumber);

        if(orderData.lineItems.length == 0){

            const failureData = {
                orderNumber: orderData.orderNumber,
                reason: "LINEITEMS_EMPTY"
                
            }
            this.emit("PROCESSING_FAILED", failureData);
            return;
        }

        //validates stock
        const stockList = require("./stock-list.json");

        const found = orderData.lineItems.find((item) => {
            const matchedItem = stockList.find((stockItem) => stockItem.id == item.itemId);
            if(matchedItem){
                return item.quantity > matchedItem.stock
            }
        });
        
        if(found){
            const failureData = {
                orderNumber: orderData.orderNumber,
                itemId: found.itemId,
                reason: "INSUFFICIENT_STOCK"
                
            }
            this.emit("PROCESSING_FAILED", failureData);
            return;
        }


        if(orderData.lineItems.length == 0){

            const failureData = {
                orderNumber: orderData.orderNumber,
                reason: "LINEITEMS_EMPTY"
                
            }
            this.emit("INSUFFICIENT_STOCK", failureData);
        }

        this.emit("PROCESSING_SUCCESS", orderData.orderNumber);
        
    }
}



