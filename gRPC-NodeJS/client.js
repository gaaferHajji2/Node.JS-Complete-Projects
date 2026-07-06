import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

const PROTO_PATH = path.join(import.meta.dirname, 'greeter.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const proto = grpc.loadPackageDefinition(packageDefinition).greeter

function main() {
  const client = new proto.Greeter('localhost:5050', grpc.credentials.createInsecure())
  // client.SayHello({ name: 'Jafar Loka' }, (error, response) => {
  //   if(error) {
  //     console.error("Error In Getting Response From Server: ", error)
  //     return;
  //   }

  //   console.log(`The Response From The Server is: ${response.message}`)
  // })

  let call = client.GetNumbers({ count: 5 })
  
  call.on('data', (response) => {
    console.log("The data is: ", response)
  })

  call.on('end', () => {
    console.log("The stream has been closed")
  })
}

main()