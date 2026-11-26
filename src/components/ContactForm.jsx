import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import schema from "../schemas/schema";

function ContactForm() {
    const [submitData, setSubmitData] = useState([]);
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nama: "",
            email: "",
            pesan: "",
        },
    }); 

    const onSubmit = (data) => {
        const newData = {
            ...data, tanggal: new Date().toLocaleDateString("id-ID")
        }
        setSubmitData((prevData) => [...prevData, newData]);
        reset();
    };

    const handleDelete = (index) => {
        setSubmitData((prevData) => prevData.filter((_, i) => i !== index)
    );
    }

    const [error, setError] = useState("");
    return(
        <div>
            <div className="judul">
                <h1>Contact Us</h1>
                <p>Punya pesan, saran, atau pertanyaan? Yuk, tulis disini!</p>
            </div>

            <div className="card">
                <div className="card-send">
                    <h1>Send a Message</h1>
                    <p>Isi form di bawah ini yaa</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label><strong>Nama</strong></label>
                            <input type="text" placeholder="Masukkan nama anda" {...register("nama")} />
                        </div>

                        <div className="form-group">
                            <label><strong>Email</strong></label>
                            <input type="email" placeholder="Masukkan email anda" {...register("email")} />
                        </div>

                        <div className="form-group">
                            <label><strong>Pesan</strong></label>
                            <textarea placeholder="Tulis pesan anda disini" {...register("pesan")}></textarea>
                        </div>

                        <button type="submit">
                            Kirim
                        </button>

                    {error && <p>{error}</p>}
                    </form>
                </div>

                <div className="card-receive">
                    <h1>Pesan yang dikirim</h1>

                    {submitData && (
                        <div>
                            {submitData.map((users, index) => (
                                <div className="card-data" key={index}>
                                    <div className="data-kiri">
                                        <h3>{users.nama}</h3>
                                        <div className="data-kanan">
                                            <small>{users.tanggal}</small>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault(); handleDelete(index);
                                            }}>Delete</a>                                        
                                        </div>
                                        {/* <button type="button" onClick={() => handleDelete(index)}>delete</button> */}
                                    </div>
                                    <small>{users.email}</small>
                                    <p>{users.pesan}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactForm;