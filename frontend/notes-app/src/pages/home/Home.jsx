import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md"; 
import AddEditNotes from "../../pages/home/AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

function Home() {
  const [openAddEditModal, setopenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting with client"
            date="2024-10-12"
            content="Discuss project details and timeline..."
            tags="Meeting the 7th April"
            isPinned={true}
            onEdit={() => {}}
            onDeleted={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-primary p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={() => {
          setopenAddEditModal({ isShown: true, type: 'add', data: null }); 
        }}
      >
        <MdAdd className="text-[32px] text-white" /> 
      </button>
      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setopenAddEditModal({ isShown: false, type: '', data: null });
        }}
        style={{
          overlay:{
            background: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note Modal"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={()=>{
          setopenAddEditModal({isShown: false, type:"add", data:null})
        }}
        />
      </Modal>
    </>
  );
}

export default Home;
