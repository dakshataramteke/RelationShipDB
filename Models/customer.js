const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
.then(()=> console.log("Connection Successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}
const OrderSchema = new Schema ({
   item: String,
   price :Number,

});
const customerSchema = new Schema({
    name: String,
    Orders:[
        {
            type:Schema.Types.ObjectId, // type me object id likhne k wajah se Mongo DB me object print kiya
            ref:"Order"
        }
    ]
})
const Order = mongoose.model("Order",OrderSchema); // model
const Customer = mongoose.model("Customer",customerSchema);


//Functions
const findCustomer = async ()=>{
   let result1 = await Customer.find({}).populate("Orders");
    console.log(result1[0]);
}
// findCustomer();


//customer
const addCust = async ()=>{
    let newCust = new Customer ({
        name: "Rahul"
    });

    let newOrder = new Order ({
        item: "Laptop",
        price: 450
    });
    newCust.Orders.push(newOrder);
    await newOrder.save();
    await newCust.save();

    console.log("Added new Customers ");
   
}
const delCount = async ()=>{
    let data =await Customer.findByIdAndDelete("66bb58f028c052bcc1de1192");
    console.log(data);
}
delCount();
// addCust();
