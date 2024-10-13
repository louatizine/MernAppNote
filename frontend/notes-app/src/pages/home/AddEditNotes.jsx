import React, { useState } from 'react'; // Import React and useState
import TagInput from "../../components/inputs/TagInput";
import { MdClose } from "react-icons/md"; // Use forward slashes for the path

const AddEditNotes = ({ noteData, type, onClose }) => { // Destructure props

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState("");
   const addNewNote = async () =>{}
   const editNote = async () =>{}

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title.");
            return;
        }

        if (!content) {
            setError("Please enter the content.");
            return;
        }
        setError("");


        if(type === 'edit '){
          editNote()
        }else{        addNewNote()}
        // You can add logic here to save the note
    };

    return (
        <div className="relative">
            <button 
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500' 
                onClick={onClose} // Use onClose instead of onclose
            >
                <MdClose className='text-xl text-slate-400' />
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input 
                    type='text' 
                    className='text-2xl text-slate-950 outline-none' 
                    placeholder='Go to gym' 
                    value={title} 
                    onChange={({ target }) => setTitle(target.value)} // Corrected 'targe' to 'target'
                />
    
                <div className='flex flex-col mt-4'>
                    <label className='input-label'>Content</label>
                    <textarea 
                        className='text-2xl text-slate-950 outline-none bg-slate-50 p-2 rounded' 
                        placeholder='Content' 
                        rows={10} 
                        value={content} 
                        onChange={({ target }) => setContent(target.value)} // Corrected 'targe' to 'target'
                    ></textarea>
                </div>

                <div className='mt-3'>
                    <label className='input-label'>TAGS</label>
                    <TagInput tags={tags} setTags={setTags} /> {/* Corrected the prop passed */}
                    {error && <p className="text-red-500 text-xs pt-4">{error}</p>}






                </div>

                <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}> 
                    ADD 
                </button>
            </div>
        </div>
    );
};

export default AddEditNotes;
