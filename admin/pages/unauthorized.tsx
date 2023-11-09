import { useRouter } from "next/router"
import { routingLink } from "src/utils/routingLink"

const Unauthorized = () => {
    const { push } = useRouter()

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flex flex-grow">
                <button onClick={() => push(routingLink.login)}>Go to Login</button>
            </div>
        </section>
    )
}

export default Unauthorized