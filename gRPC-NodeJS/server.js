import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

const PROTO_PATH = path.join(import.meta.dirname, 'greeter.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const proto = grpc.loadPackageDefinition(packageDefinition).greeter

function sayHello(call, callback) {
  const reply = { message: `Hello, ${call.request.name}` }
  callback(null, reply)
}

function main() {
  const server = new grpc.Server()
  server.addService(proto.Greeter.service, { SayHello: sayHello })
  server.bindAsync('0.0.0.0:5050', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if(error){
      console.error("Error in bindAsync method: ", error)
      return
    }

    console.log(`Server Running On Port: ${port}`)
  })
}

main()