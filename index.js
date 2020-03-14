const {ApolloServer} = require("apollo-server");

const typeDefs = require("./schema");

const resolvers = {
    Query: {
        highlights: () => highlights,
        highlight: (parent, args) => {
            return highlights.find(highlight => highlight.id === args.id);
        }
    },
    Mutation: {
        newHighlight: (parent, args) => {
            const highlight = {
                id: String(highlights.length + 1),
                title: args.title || "",
                author: args.author || "",
                content: args.content
            };
            highlights.push(highlight);
            return highlight;
        },
        updateHighlight: (parent, args) => {
            const index = highlights.findIndex(highlight => highlight.id === args.id);
            const highlight = {
                id: args.id,
                content: args.content,
                author: highlights[index].author,
                title: highlights[index].title
            };
            highlights[index] = highlight;
            return highlight;
        },
        deleteHighlight: (parent, args) => {
            const deletedHighlight = highlights.find(
                highlight => highlight.id === args.id
            );
            highlights = highlights.filter(highlight => highlight.id !== args.id);
            return deletedHighlight;
        }
    }
};


let highlights = [
    {
        id: "1",
        content: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
        title: "As You Like It",
        author: "William Shakespeare"
    },
    {
        id: "2",
        content: "In the limits of a situation there is humor, there is grace, and everything else.",
        title: "Arbitrary Stupid Goal",
        author: "Tamara Shopsin"
    },
    {
        id: "3",
        content: "Any fool can know. The point is to understand.",
        author: "Albert Einstein"
    },
    {
        id: "4",
        content: "The measure of intelligence is the ability to change.",
        author: "Albert Einstein"
    },
    {
        id: "5",
        content: "Failure is the condiment that gives success its flavor.",
        author: "Truman Capote"
    },
    {
        id: "6",
        content: "He who knows all the answers has not been asked all the questions.",
        author: "Confucius"
    },
    {
        id: "7",
        content: "Knowing others is intelligence; knowing yourself is true wisdom.\
                    Mastering others is strength; mastering yourself is true power.",
        title: "Tao Te Ching",
        author: "Lao Tzu",
    },
    {
        id: "8",
        content: "We can know only that we know nothing. And that is the highest \
                 degree of human wisdom.",
        title: "War and Peace",
        author: "Leo Tolstoy",
    }
];



const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`📚 Highlights server ready at ${url}`);
});
