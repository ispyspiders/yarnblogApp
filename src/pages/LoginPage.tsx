import { SignIn, WarningCircle } from "@phosphor-icons/react"
import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
    }



    return (
        <div className="p-8">
            <div className="bg-white rounded-lg p-4 mt-2 mx-auto max-w-80 drop-shadow-sm">
                <h1 className="text-lg text-center text-blue-deep font-semibold my-4">Logga in</h1>
                <form onSubmit={handleSubmit}>
                    {/* Felmeddelande */}
                    {error && (
                        <div className="bg-red-100 border border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
                            <WarningCircle size={24} className="text-red-500 me-2"/> {error}
                        </div>
                    )}

                    <div className="flex flex-col mb-4">
                        <label className="text-sm text-dust-deep mb-2" htmlFor="email">Epost</label>
                        <input type="email" id="email" className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50" />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-sm text-dust-deep mb-2" htmlFor="password">Lösenord</label>
                        <input type="password" id="password" className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50" />
                    </div>

                    <button className="bg-blue-deep text-white ps-8 pe-4 py-2 rounded-lg flex mx-auto my-8  drop-shadow-sm hover:bg-blue-mid" type="submit"><span className="me-2">Logga in</span> <SignIn size={24} /></button>
                </form>
                <div>
                </div>
                <p className="text-center text-sm text-dust-deep">Inte medlem? <a className="underline hover:text-pink-deep" href="">Bli medlem!</a></p>
            </div>
        </div>
    )
}

export default LoginPage