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

const fetchStudents = async (req, res) => {
    try {
        const { email, walletAddress } = req.query; // Getting query params from the request

        if (!email && !walletAddress) {
            return res.status(400).json({ error: 'Either email or walletAddress is required' });
        }

        // Find students by email or walletAddress
        const student = await Student.findOne({
            $or: [{ email: email || null }, { walletAddress: walletAddress || null }],
        });

        if (student.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        return res.status(200).json({ student });
    } catch (error) {
        console.error('Error fetching students:', error);
        return res.status(500).json({ error: 'Failed to fetch students' });
    }
};

module.exports = { handleStudentLogin, fetchStudents };
