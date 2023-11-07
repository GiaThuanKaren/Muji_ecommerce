import { useRouter } from "next/router"

const Unauthorized = () => {
    const router = useRouter()

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flex flex-grow">
                <button onClick={() => router.back()}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized