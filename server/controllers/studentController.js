const { EthrDID } = require('ethr-did');
const Student = require('../models/users');
const crypto = require('crypto'); // To generate cryptographic hash

// Function to create or retrieve the student's DID
const handleStudentLogin = async (req, res) => {
    try {
        const { email, walletAddress } = req.body; // Get from Clerk login
        console.log(JSON.stringify(req.body));

        // Validate the input
        if (!email && !walletAddress) {
            return res.status(400).json({ error: 'Either email or walletAddress is required' });
        }
        if (email && walletAddress) {
            return res.status(400).json({ error: 'Only one of email or walletAddress can be provided' });
        }

        // Check if student already exists  
        let student = await Student.findOne({ $or: [{ email }, { walletAddress }] });

        if (!student) {
            let did;

            if (walletAddress) {
                // Generate EthrDID for wallet address
                const ethrDid = new EthrDID({ identifier: walletAddress });
                did = ethrDid.did;
                console.log("EthrDId: ", did);
            } else if (email) {
                const hash = crypto.createHash('sha256').update(email).digest('hex');
                did = `did:email:${hash}`;
                console.log("Email DID: ", did);
            }
            student = new Student({
                email: email || null,
                walletAddress: walletAddress || null,
                did: did,
            });

            await student.save();
        }

        return res.status(200).json({ message: 'Login successful', did: student.did });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to login student' });
    }
};

module.exports = { handleStudentLogin };
