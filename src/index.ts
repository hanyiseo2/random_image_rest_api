import app from "./app"
import { init } from "./config"

init()
const PORT = 3000

app.listen(PORT, () => {
    console.log(`The server is listening to the port ${PORT}`)
})