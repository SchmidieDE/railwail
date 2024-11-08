import Form from "../components/Form"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

function Login() {

    const handleFetch = async() => {
        console.log("fetching")
        const response = await fetch("http://localhost:8000/api/test/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                username: "test",
                password: "test"
            })
        })
        const obj = await response.json()
        console.log(response, "RESPONSE ", await obj)
    }



    return (
    <div> 
        <Form route="/api/token/" method="login" />
        
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Öffne Popup</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Popup Titel</DialogTitle>
                </DialogHeader>
                <p>Hier kommt der Inhalt des Popups hin.</p>
            </DialogContent>
        </Dialog>

        <button onClick={handleFetch} style={{color: "black"}}>
            Test
        </button><Button></Button>
    </div>
    )
}

export default Login