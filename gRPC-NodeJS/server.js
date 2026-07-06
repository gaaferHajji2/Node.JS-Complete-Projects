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

function getNumbers(call) {
  const count = call.request.count
  let current = 1
  const interval = setInterval(()=> {
    if(current > count){
      clearInterval(interval)
      call.end()
      return;
    }
    call.write({ order: current, number: current * 100})
    current += 1;
  }, 1000)
}

function main() {
  const server = new grpc.Server()
  server.addService(proto.Greeter.service, { 
    SayHello: sayHello,
    GetNumbers: getNumbers
  })
  server.bindAsync('0.0.0.0:5050', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if(error){
      console.error("Error in bindAsync method: ", error)
      return
    }

    console.log(`Server Running On Port: ${port}`)
  })
}

main()