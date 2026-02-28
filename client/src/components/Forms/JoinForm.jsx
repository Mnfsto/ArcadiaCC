import { useNavigate } from "react-router-dom";

export const JoinForm = ({ closeModal }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // If there's no actual backend logic yet, we just navigate to success
        // In a real app, you'd do an async fetch here first
        e.preventDefault();
        navigate('/success');
        if (closeModal) closeModal();
    }

    return (

        <div className="modal">
            <div onClick={() => closeModal()} className="modal__button-close">
                <span className="close">X</span>
            </div>
            <div className="modal__container">
                <form onSubmit={handleSubmit} className='form form-join'>
                    <input className="form__input" type="hidden" name="id" value="0" />
                    <label className="form__label">Name</label>
                    <input className="form__input" name="name" type="text" placeholder="Name" />
                    <label className="form__label">Phone</label>
                    <input className="form__input" type="phone" name="phone" placeholder="380 ___ __ __" />
                    <label className="form__label">Email</label>
                    <input className="form__input" type="email" name="email" placeholder="__@__._" />
                    <button className="button form__button" id="Btn" type="submit">Join</button>
                </form>
                <div className="modal__description">
                    <p>Arcadia Cycling Club - it is a cycling team of Arcadia Club Odessa-Ukraine.
                        It was founded in 2000 of International Level
                        Club Unites amateur athletes, professional athletes.
                        Club Members representing the team in several disciplines such as road bike, cyclocross, gravel
                        and mountain bike.</p>
                    <img src="/image/arcadia2025.jpg" alt="Arcadia 2025" className="modal__image" />
                </div>
            </div>
        </div>
    )
}

export default JoinForm