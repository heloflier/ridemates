
// ============================================================================
//                     			Users Schema        
// ============================================================================

const mongoose				= require('mongoose');
const Schema				= mongoose.Schema;
// const bcrypt				= require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
			username: 	String,
			password: 	String,
			imageUrl: 	String, 
			firstname: 	String,
			lastname: 	String,
			address1: 	String,
			address2: 	String,
			city: 		String,
			state: 		String,
			zipcode: 	Number,
			email: 		String,
			phonenum: 	Number,
			radius: 	Number,
			coordinates: {
				lat: Number,
				lng: Number
			},
			dateCreated: {
				type: 		Date,
				required: 	false
			}
})

UserSchema.plugin(passportLocalMongoose);
// UserSchema.methods.encryptPassword = function(password) {
	// return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

// }

const User = mongoose.model('User', UserSchema);

module.exports = User;