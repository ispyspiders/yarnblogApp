import { SignIn, SpinnerGap, WarningCircle } from "@phosphor-icons/react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationInfo } from "../types/auth.types";
import * as Yup from "yup";


interface ErrorsData {
    name?: string,
    email?: string,
    password?: string,
    message?: string
}


const RegisterPage = () => {
    const [formData, setFormData] = useState<RegistrationInfo>({ name: "", email: "", password: "" })
    const [errors, setErrors] = useState<ErrorsData>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, user } = useAuth();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("Namn måste anges").min(2, "Namn måste innehålla minst 2 tecken"),
        email: Yup.string().required("Epost får inte vara tomt").email("Ange en giltig epost adress"),
        password: Yup.string().required("Lösenord måste anges").max(50, "Lösenord får max innehålla 50 tecken").min(8, "Lösenord måste minst innehålla 8 tecken")
    });

    // kontrollera användare
    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        try {
            await validationSchema.validate(formData, { abortEarly: false }); // validera input
            const newUser = formData;

            try {
                await register(newUser);
                navigate("/profile");
            } catch (error) {
                setErrors({ message: "Något gick fel vid API-anropet: " + error })
                console.error("Fel vid API-anrop: ", error);
            }
        } catch (validationErrors) {
            const validationErrorMessages: ErrorsData = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach(error => {
                    const prop = error.path as keyof ErrorsData;
                    validationErrorMessages[prop] = error.message;
                })
                setErrors(validationErrorMessages);
            }
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <div className="p-8">
            <div className="bg-white rounded-lg p-4 mt-2 mx-auto max-w-80 drop-shadow-sm">
                <h1 className="text-lg text-center text-blue-deep font-semibold my-4">Registrera användare</h1>
                <form onSubmit={handleSubmit}>
                    {/* Felmeddelande */}
                    {errors.message && (
                        <div className="bg-red-100 border border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
                            <WarningCircle size={24} className="text-red-500 me-2" /> {errors.message}
                        </div>
                    )}

                    <div className="flex flex-col mb-4">
                        <label className="text-sm text-dust-deep mb-2" htmlFor="name">Namn</label>
                        <input
                            type="name"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50"
                        />
                        {errors.name && <span className="text-sm mt-2 text-red-600">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-sm text-dust-deep mb-2" htmlFor="email">Epost</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50"
                        />
                        {errors.email && <span className="text-sm mt-2 text-red-600">{errors.email}</span>}

                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-sm text-dust-deep mb-2" htmlFor="password">Lösenord</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50"
                        />
                        {errors.password && <span className="text-sm mt-2 text-red-600">{errors.password}</span>}

                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-deep text-white p-4 py-2 rounded-lg flex mx-auto my-8  drop-shadow-sm hover:bg-blue-mid"
                    >
                        {isSubmitting ? 
                        <>
                        <span className="me-2">Registrerar</span> <SpinnerGap size={24} className="animate-spin ms-4" />
                        </>
                        :
                        <>Join the fun!</>
                        }
                    </button>
                </form>
                <div>
                </div>
                <p className="text-center text-sm text-dust-deep">Redan medlem? <Link to="/login" className="underline hover:text-pink-deep">Logga in</Link></p>
            </div>
        </div>)
}

export default RegisterPage