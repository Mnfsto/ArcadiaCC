import { useNavigate } from "react-router-dom";

export const JoinForm = ({ closeModal }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            // POST data to the backend (saves to DB, Airtable, sends email)
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.warn('Backend save failed, proceeding anyway:', err);
        }

        // Navigate to Step 2 with the collected data
        navigate('/join-step-2', { state: data });
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
                    <label className="form__label">Full Name</label>
                    <input className="form__input" name="fullName" type="text" placeholder="Full Name" required />
                    <label className="form__label">Phone</label>
                    <input className="form__input" type="phone" name="phone" placeholder="380 ___ __ __" required />
                    <label className="form__label">Email</label>
                    <input className="form__input" type="email" name="email" placeholder="__@__._" required />
                    <button className="button form__button" id="Btn" type="submit">Continue to Step 2</button>
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