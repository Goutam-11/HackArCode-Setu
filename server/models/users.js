const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows for unique constraint on non-existent values
    },
    walletAddress: {
        type: String,
        unique: true,
        sparse: true, // Allows for unique constraint on non-existent values
    },
    did: {
        type: String,
        required: true,
    }
});

// Ensure that either email or walletAddress is present, but not both
studentSchema.pre('save', function (next) {
    if (!this.email && !this.walletAddress) {
        return next(new Error('Either email or walletAddress must be provided'));
    }
    if (this.email && this.walletAddress) {
        return next(new Error('Only one of email or walletAddress can be provided'));
    }
    next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
