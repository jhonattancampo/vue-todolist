import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from '../models/Task';

dotenv.config();

const seedTasks = [
  {
    title: 'Buy groceries',
    description: 'Milk, Bread, Eggs',
    completed: false,
    deadline: new Date(Date.now() + 86400000), // 1 day from now
  },
  {
    title: 'Complete project report',
    description: 'Finalize the ToDo List project report',
    completed: false,
    deadline: new Date(Date.now() + 172800000), // 2 days from now
  },
  {
    title: 'Call John',
    description: 'Discuss the upcoming meeting',
    completed: true,
    deadline: new Date(Date.now() - 86400000), // 1 day ago
  },
];

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    await Task.deleteMany({});
    await Task.insertMany(seedTasks);
    console.log('Seed data inserted');
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
