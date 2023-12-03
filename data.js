const { sub } = require("date-fns");

const users = [
  {
    id: "1",
    username: "admin",
    password: "1",
    role: "admin",
    firstname: "john",
    lastname: "doe",
    gender: "male",
  },
  {
    id: "2",
    username: "client",
    password: "1",
    role: "client",
    firstname: "jane",
    lastname: "doe",
    gender: "female",
  },
];

const posts = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    userId: "1",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: "",
  },
  {
    id: "3",
    title: "Exploring TypeScript",
    content: "TypeScript brings static typing to JavaScript.",
    date: sub(new Date(), { hours: 2 }).toISOString(),
    userId: "2",
  },
  {
    id: "4",
    title: "React Hooks Deep Dive",
    content: "Understanding the nuances of React hooks.",
    date: sub(new Date(), { days: 1 }).toISOString(),
    userId: "",
  },
  {
    id: "5",
    title: "GraphQL and Apollo Client",
    content: "Building modern APIs with GraphQL and Apollo Client.",
    date: sub(new Date(), { weeks: 2 }).toISOString(),
    userId: "",
  },
  {
    id: "6",
    title: "Diving into Databases",
    content: "Choosing the right database for your application.",
    date: sub(new Date(), { months: 1 }).toISOString(),
    userId: "1",
  },
];

const authors = [
  { id: "0", name: "Dude Lebowski" },
  { id: "1", name: "Neil Young" },
  { id: "2", name: "Dave Gray" },
];

module.exports = {
  posts,
  authors,
  users,
};
