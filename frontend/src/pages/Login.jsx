import Form from "../components/Form"

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
        Das ist ein test  P
        <button onClick={handleFetch} style={{color: "black"}}>
            Test
        </button>
    </div>
    )
}

export default Login