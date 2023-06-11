
import { Button, Label, Modal } from 'flowbite-react';
import { toast } from 'react-toastify';

function FeedbackModal({ props, id }) {

    const handleFeedback = (e) => {
        e.preventDefault();
        const feedback = e.target.feedback.value;
        fetch(`http://localhost:5000/Classes?id=${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({feedback})

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast('Feedback Success', {
                        position: "top-right",
                        autoClose: 1000,
                    });
                    e.target.reset()
                }
            })
    }

    return (
        <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleFeedback} className="space-y-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Please Your Feedback</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="feedback" value="Your feedback" />
                        </div>
                        <textarea className='w-full h-32 focus:border-none outline-none border border-gray-200 rounded-xl shadow-xl' name="feedback" id="feedback"></textarea>
                    </div>
                    <Button type='submit' gradientDuoTone="purpleToBlue">Feedback</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default FeedbackModal
