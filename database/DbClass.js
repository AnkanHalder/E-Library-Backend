require('dotenv').config();
const mongoose = require('mongoose');
const {userSchema,bookSchema} = require('./schemas');

class dbClass{
    constructor(){
        mongoose.connect(process.env.MONGO_URL);
        this.user = mongoose.model('userData',userSchema);
        this.book = mongoose.model('book',bookSchema);
    }
    async postBook(book){
        const newBook = new this.book({
            author: book.author,
            description: book.description,
            coverLink: book.Link,
            genre: book.genre,
            count: book.count,
            Borrow: [],
            name : book.name,
        });
        const savedBook = await newBook.save();
        return savedBook;
    }
    async checkOrCreateUser(userEmail,userName){
        const user = await this.user.findOne({ email: userEmail}).exec();
        if (user == null || user==undefined) {
            const newUser = new this.user({
                email: userEmail,
                name: userName,
                cart: [],
                Orders: [],
                myBooks: []
            });
            try {
              const savedUser = await newUser.save();
            } catch (error) {
                console.log("Error:", error);
            }
        }
    }
    async getUserDetails(userEmail,userName){
        await this.checkOrCreateUser(userEmail,userName);
        try{
            const user = await this.user.findOne({ email: userEmail});
            return user;
        } catch(Error) {
            console.error("Nop User Returned => Error:", error);
        }
    }
    async searchByCatagory(cat) {
        try {
            const bList = this.book.find({genre: cat}).exec();
            if(!bList) return [];
            else return bList;
        } catch(error) {
            console.log("Error Getting Books: ", error);
        }
    }
    async searchByID(id) {
        try {
            const b = await this.book.findById(id).exec();
            if(!b) return [];
            else return b;
        } catch(error) {
            console.log("Error Getting Books: ", error);
        }
    }
    async addToCart(email, id) {
        try {
          const user = await this.user.findOne({ email: email }); // Find the user by email
          if (!user) {
            console.error("User not found.");
            return null; // Return null if user not found
          }
          user.cart.push(id);
          const updatedUser = await user.save();
          return updatedUser;
        } catch (error) {
          console.error("Error updating user's cart:", error);
          return null; 
        }
      }
}

module.exports = dbClass;