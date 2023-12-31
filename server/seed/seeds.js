const mongoose = require('mongoose');
const User = require('../models/User'); // replace with the actual path to your User model
const Thread = require('../models/Threads'); // replace with the actual path to your Thread model
const Post = require('../models/Post'); // replace with the actual path to your Post model
const config = require('../config/config');
const Topic = require('../models/Topic'); // replace with the actual path to your Topic model

const seedTopics = [
    { name: 'Software Development', category: 'Career' },
    { name: 'Data Science', category: 'Career' },
    { name: 'Marketing', category: 'Career' },
    { name: 'Graphic Design', category: 'Career' },
    { name: 'Human Resources', category: 'Career' },
    { name: 'Finance & Accounting', category: 'Career' },
    { name: 'Sales & Business Development', category: 'Career' },
    { name: 'Healthcare & Medicine', category: 'Career' },
    { name: 'Engineering & Architecture', category: 'Career' },
    { name: 'Education & Training', category: 'Career' },
    { name: 'Real Estate', category: 'Career' },
    { name: 'Legal & Law', category: 'Career' },
    { name: 'Travel & Tourism', category: 'Career' },
    { name: 'Arts & Entertainment', category: 'Career' },
    { name: 'Food & Culinary', category: 'Career' },
    { name: 'Science & Research', category: 'Career' },
    { name: 'Journalism & Writing', category: 'Career' },
    { name: 'Entrepreneurship & Startups', category: 'Career' }
    
];

const seedUsers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password1'
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '0987654321',
        password: 'password2'
    }
];

const seedThreads = [
    {
        title: 'First thread',
        topic: 'Real Estate',
        likes: ['User2', 'User3']
    },
    {
        title: 'Second thread',
        topic: 'Software Development',
        likes: ['User1']
    },

    
];

const seedPosts = [
    {
        content: 'First reply'
    },
    {
        content: 'Second reply'
    },
];

const seedDatabase = async () => {
    await mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("MongoDB connected…");
    await User.deleteMany({});
    await Thread.deleteMany({});
    await Post.deleteMany({});
    await Topic.deleteMany({});

    console.log('Users, Threads, Posts and Topics cleared');

    // Seeding Topics
    for(let topic of seedTopics) {
        let newTopic = new Topic(topic);
        await newTopic.save();
        console.log('Topic created: ' + newTopic.name);
    }

    for(let seed of seedUsers) {
        let user = new User(seed);
        await user.save();
        console.log('User created: ' + user.firstName);
    }

    for(let i = 0; i < seedThreads.length; i++) {
        let topicId = await Topic.findOne({ name: seedThreads[i].topic });

        let thread = new Thread({...seedThreads[i], userId: seedUsers[i].email, topic: topicId._id});
        let savedThread = await thread.save();
        console.log('Thread created: ' + savedThread.title);

        let post = new Post({...seedPosts[i], userId: seedUsers[i].email, threadId: savedThread._id});
        let savedPost = await post.save();
        console.log('Post created: ' + savedPost.content);

        savedThread.replies.push(savedPost._id);
        await savedThread.save();
    }

    console.log('Database seeding completed');
    process.exit();
}

seedDatabase().catch(console.error);