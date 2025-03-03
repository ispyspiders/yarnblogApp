import { ShareFat, SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { url } from "../types/auth.types";

interface FormData {
    title: string,
    content: string,
    category: string,
}

interface ErrorsData {
    title?: string,
    content?: string,
    category?: string,
    message?: string
}

const categoryOptions = ["Virkning", "Stickning", "Tovning", "Vävning", "Broderi", "Garn & material", "Event & träffar", "Övrigt"];

const NewPostPage = () => {
    const [formData, setFormData] = useState<FormData>({ title: "", content: "", category: "" });
    const [errors, setErrors] = useState<ErrorsData>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const validationSchema = Yup.object({
        title: Yup.string().required("Vänligen ange en titel").min(4, "Titel måste innehålla minst 4 tecken"),
        content: Yup.string().required("Innehåll får inte vara tomt"),
        category: Yup.string().required("Vänligen ange en kategori").max(50, "Kategori får max innehålla 50 tecken")
    });

    // skicka formulär
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await validationSchema.validate(formData, { abortEarly: false }); // validera input
            const newPost = formData;

            // API anrop
            try {
                const resp = await fetch(url + "/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("yarnToken")
                    },
                    body: JSON.stringify(newPost),
                });

                if (!resp.ok) {
                    throw new Error(`API-anropet misslyckades med status: ${resp.status}`);
                }

                const createdPost = await resp.json();
                setRedirect(true);
            } catch (error) {
                setErrors({ message: "Något gick fel vid API-anropet: " + error });
                console.error("Fel vid API-anrop: ", error);
            }
            setErrors({});

        } catch (validationErrors) {
            const validationErrorMessages: ErrorsData = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach(error => {
                    const prop = error.path as keyof ErrorsData;
                    validationErrorMessages[prop] = error.message;
                })
                setErrors(validationErrorMessages);
            }
            else setErrors({ message: "Något gick fel vid skapandet av inlägget" });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (redirect) return <Navigate to="/profile" replace />;

    return (
        <div className="p-4 pt-8 md:p-16">
            <h1>Nytt inlägg</h1>

            <div className="bg-white rounded-lg mt-4 p-8 max-w-screen-md drop-shadow-sm">
                <form onSubmit={handleSubmit} className="grid grid-cols-3">
                    {/* Felmeddelande */}
                    {errors.message && (
                        <div className="bg-red-100 border border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
                            <WarningCircle size={24} className="text-red-500 me-2" /> {errors.message}
                        </div>
                    )}

                    <div className="flex flex-col mb-4 w-full col-span-3">
                        <label className=" text-dust-deep mb-1" htmlFor="title">Titel</label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50 md:w-2/3"
                        />
                        {errors.title && <span className="text-sm mt-2 text-red-600">{errors.title}</span>}
                    </div>

                    <div className="flex flex-col mb-4 w-full col-span-3">
                        <label className=" text-dust-deep mb-1" htmlFor="category">Kategori</label>
                        <select name="category"
                            id="category"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50 md:w-2/3">

                            <option>-- Välj en kategori --</option>
                            {categoryOptions.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.category && <span className="text-sm mt-2 text-red-600">{errors.category}</span>}
                    </div>


                    <div className="flex flex-col mb-4 w-full col-span-3">
                        <label className=" text-dust-deep mb-1" htmlFor="content">Innehåll</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            rows={10}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="text-md p-2 rounded border border-dust-mid drop-shadow-sm focus:bg-pink-light focus:bg-opacity-50 md:w-2/3">
                        </textarea>
                        {errors.content && <span className="text-sm mt-2 text-red-600">{errors.content}</span>}
                    </div>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="col-span-3 md:col-span-2 w-fit mx-auto bg-blue-deep text-white ps-8 pe-4 py-2 mt-12 rounded-lg flex my-8 drop-shadow-sm hover:bg-blue-mid"
                    >
                        {isSubmitting ? <><span className="me-2">Publicerar</span> <SpinnerGap size={24} className="animate-spin ms-4" /></>
                            :
                            <>
                                <span className="me-2">Publicera</span> <ShareFat size={24} />
                            </>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewPostPage