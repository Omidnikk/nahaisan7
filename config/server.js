import express from 'express';
import http from 'http';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import createContext from '../context.js'
import resolvers from "../graphql/resolvers/index.js";
import corsOptions from './cors.js'
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log("🚀 ~ __dirname:", __dirname)
// const projectRoot = path.resolve(__dirname, '..'); // Correctly point to the root folder

const allTypeDefs = loadFilesSync(path.join(__dirname, '../graphql/typedefs/**/*.graphql'));
// console.log("🚀 ~ allTypeDefs:", allTypeDefs)
const typeDefs = mergeTypeDefs(allTypeDefs);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const app = express();
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const serverCleanup = useServer({
        schema,
        context: createContext
    }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ],
    });

    await server.start();

    app.use(
        '/graphql',
        cors(corsOptions),
        graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
        expressMiddleware(server, {
            context: createContext,
        }),
    );

    httpServer.listen(4000, () => {
        console.log("Server running on http://localhost:4000/graphql");
    });
};

export default startServer;