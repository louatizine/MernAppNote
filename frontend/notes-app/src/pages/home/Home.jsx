import Navbar from "../../components/navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md"; 
import AddEditNotes from "../../pages/home/AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios"; // Ensure axiosInstance is imported correctly

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-users"); // Ensure the endpoint is correct
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login"); // Redirect to login instead of dashboard
      } else {
        console.error("Error fetching user info:", error); // Log unexpected errors
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* You may want to map over your notes here instead of hardcoding one NoteCard */}
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
          setOpenAddEditModal({ isShown: true, type: 'add', data: null }); 
        }}
      >
        <MdAdd className="text-[32px] text-white" /> 
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: '', data: null });
        }}
        style={{
          overlay: {
            background: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note Modal"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
}

export default Home;
